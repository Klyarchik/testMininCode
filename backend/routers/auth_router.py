import base64

from fastapi import APIRouter, HTTPException, Response, Request
from fastapi.params import Depends
from sqlalchemy import select
import bcrypt

from db.models import SessionDep, UserModel
from jwt_settings import security, config
from pydantic_classes import RegUserSchema, ReturnDetailSchema, ReturnAccessTokenSchema, ReturnUserSchema, \
    EnterUserSchema

auth_router = APIRouter(prefix="/auth")


@auth_router.post("/reg", tags=["auth"], description="Регистрация пользователя")
async def reg(body: RegUserSchema, session: SessionDep, response: Response) -> ReturnAccessTokenSchema:
    query = select(UserModel).filter(UserModel.email == body.email)
    result = await session.execute(query)
    if result.one_or_none():
        raise HTTPException(status_code=409, detail="Такой email уже используется")
    password_hash = bcrypt.hashpw(body.password.encode(), bcrypt.gensalt())
    with open("no-avatar.png", "rb") as file:
        image_bytes = file.read()
    new_user = UserModel(name=body.name, email=body.email, password=password_hash, avatar=image_bytes)
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    access_token = security.create_access_token(uid=str(new_user.id))
    response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, access_token, httponly=True, samesite="lax", secure=False)
    return {"access_token": access_token}


@auth_router.delete("/exit", tags=["auth"], description="Выход из аккаунта")
async def exit_account(response: Response) -> ReturnDetailSchema:
    response.delete_cookie(config.JWT_ACCESS_COOKIE_NAME)
    return {"detail": "Вы вышли из аккаунта"}


@auth_router.get("/profile", tags=["auth"], description="Получение данных о текущем пользователе",
                 dependencies=[Depends(security.access_token_required)])
async def give_profile(request: Request, session: SessionDep) -> ReturnUserSchema:
    access_token = request.cookies.get(config.JWT_ACCESS_COOKIE_NAME)
    id = int(security._decode_token(access_token).sub)
    query = select(UserModel).filter(UserModel.id == id)
    result = await session.execute(query)
    user = result.scalar_one()
    return {"name": user.name, "email": user.email, "avatar": base64.b64encode(user.avatar).decode("utf-8")}


@auth_router.post("/enter", tags=["auth"], description="Вход в аккаунт")
async def enter(session: SessionDep, body: EnterUserSchema, resposne: Response) -> ReturnAccessTokenSchema:
    query = select(UserModel).filter(UserModel.email == body.email)
    result = await session.execute(query)
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="Неверный логин или пароль")
    if not bcrypt.checkpw(body.password.encode(), user.password):
        raise HTTPException(status_code=404, detail="Неверный логин или пароль")
    access_token = security.create_access_token(uid=str(user.id))
    resposne.set_cookie(config.JWT_ACCESS_COOKIE_NAME, access_token)
    return {"access_token": access_token}

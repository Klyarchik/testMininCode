from authx.exceptions import MissingTokenError, JWTDecodeError
from fastapi import FastAPI, HTTPException
import uvicorn
import asyncio

from db.models import create_db
from routers.auth_router import auth_router

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

@app.exception_handler(MissingTokenError)
async def missing_token(request, exc):
    raise HTTPException(status_code=403, detail="Вы не зарегисрированы")

@app.exception_handler(JWTDecodeError)
async def jwt_decode_error(request, exc):
    raise HTTPException(status_code=403, detail="Токен истек")


if __name__ == "__main__":
    asyncio.run(create_db())
    uvicorn.run("main:app", reload=True)
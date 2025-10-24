from pydantic import BaseModel, EmailStr

class RegUserSchema(BaseModel):
    email: EmailStr
    password: str
    name: str

class ReturnDetailSchema(BaseModel):
    detail: str

class ReturnAccessTokenSchema(BaseModel):
    access_token: str

class ReturnUserSchema(BaseModel):
    name: str
    email: EmailStr
    avatar: str

class EnterUserSchema(BaseModel):
    email: EmailStr
    password: str

class PutPasswordSchema(BaseModel):
    old_password: str
    new_password: str
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy import LargeBinary
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from typing import Annotated

engine = create_async_engine(f"sqlite+aiosqlite:///db/mydb.db")

new_session = async_sessionmaker(engine, expire_on_commit=True)

async def get_session():
    async with new_session() as session:
        yield session

SessionDep = Annotated[AsyncSession, Depends(get_session)]

class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)

class UserModel(Base):
    __tablename__ = "users"

    name: Mapped[str]
    email: Mapped[str]
    password: Mapped[str]
    avatar: Mapped[bytes] = mapped_column(LargeBinary)

async def create_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)


class ContactMessageResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    message: str
    createdAt: datetime

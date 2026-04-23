from datetime import datetime
from typing import List, Literal
from urllib.parse import urlparse

from pydantic import BaseModel, Field, field_validator


def _is_valid_http_url(value: str) -> bool:
    parsed = urlparse(value)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


class ExtraDetail(BaseModel):
    stepNumber: int = Field(ge=1)
    title: str
    description: str
    image: str

    @field_validator("image")
    @classmethod
    def validate_step_image_url(cls, value: str) -> str:
        trimmed = value.strip()
        if not trimmed:
            return ""
        if not _is_valid_http_url(trimmed):
            raise ValueError("Step image must be a valid http/https URL")
        return trimmed


class ProjectBase(BaseModel):
    title: str
    category: str
    year: str
    thumbnail: str
    hero: str
    tagline: str
    overview: str
    software: List[str]
    polycount: str = ""
    textures: str = ""
    renderer: str = ""
    object3dUrl: str = ""
    status: Literal["published", "on_hold"] = "published"
    extraDetails: List[ExtraDetail] = []

    @field_validator("thumbnail", "hero")
    @classmethod
    def validate_required_image_urls(cls, value: str) -> str:
        trimmed = value.strip()
        if not _is_valid_http_url(trimmed):
            raise ValueError("Image URL must be a valid http/https URL")
        return trimmed

    @field_validator("object3dUrl")
    @classmethod
    def validate_optional_3d_url(cls, value: str) -> str:
        trimmed = value.strip()
        if not trimmed:
            return ""
        if not _is_valid_http_url(trimmed):
            raise ValueError("3D URL must be a valid http/https URL")
        return trimmed


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

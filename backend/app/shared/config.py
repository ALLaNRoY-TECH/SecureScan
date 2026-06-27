from typing import List, Union
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import AnyHttpUrl, validator

class Settings(BaseSettings):
    PROJECT_NAME: str = "SecureScan"
    API_V1_STR: str = "/api/v1"
    
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # Supabase config
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    SUPABASE_JWT_SECRET: str = ""

    # SQLAlchemy Database URL
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./sql_app.db"

    # Feature Flags
    ENABLE_ZAP: bool = False
    ENABLE_NUCLEI: bool = False
    ENABLE_AI: bool = False

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

settings = Settings()

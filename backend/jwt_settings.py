from datetime import timedelta

from authx import AuthX, AuthXConfig

config = AuthXConfig()
config.JWT_ACCESS_COOKIE_NAME = "test_minin_code"
config.JWT_TOKEN_LOCATION = ["cookies"]
config.JWT_SECRET_KEY = "secret"
config.JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
config.JWT_COOKIE_CSRF_PROTECT = False

security = AuthX(config=config)
"""
Django settings for navalstorm project.

Generated by 'django-admin startproject' using Django 3.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
from decouple import config
from corsheaders.defaults import default_headers
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECURITY_KEY')


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True


ALLOWED_HOSTS = ['navalstorm.srvz-webapp.he-arc.ch','127.0.0.1']
CORS_ORIGIN_ALLOW_ALL = True


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'bootstrap4',
    'rest_framework',
    'user',
    'crispy_forms',
    'corsheaders',
]


MIDDLEWARE = [
    #'django.middleware.csrf.CsrfViewMiddleware',
    'navalstorm.middleware.DisableCSRF',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    
]

CORS_ALLOW_HEADERS = default_headers + (
    'contenttype', 'x-csrf-token'
)

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:8000',
    'http://localhost:8081',
    "navalstorm.srvz-webapp.he-arc.ch",
]
CORS_ALLOW_CREDENTIALS = True
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_NAME = "csrftoken"

ROOT_URLCONF = 'navalstorm.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

SESSION_COOKIE_DOMAIN=[".localhost:8081", ".navalstorm.srvz-webapp.he-arc.ch",".127.0.0.1:8000"]


WSGI_APPLICATION = 'navalstorm.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.mysql',
    'NAME':config('GROUPNAME'),
    'USER': config('USER_NAME', 'root'),
    'PASSWORD': config('PASSWORD', ''),
    'HOST': config('MYSQL_HOST', 'localhost'),
    'PORT': config('MYSQL_PORT', '3306'),
    'OPTIONS': {
      'charset': 'utf8mb4'
    }
  }
}

REST_FRAMEWORK = {
     'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
        'rest_framework.permissions.DjangoModelPermissions'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

CORS_ORIGIN_WHITELIST = (
    'http://localhost:8080',
    'http://localhost:8000',
    'http://localhost:8081',
    'http://localhost',
)

SESSION_COOKIE_DOMAIN=[".localhost:8081", ".localhost:8080",".navalstorm.srvz-webapp.he-arc.ch",".127.0.0.1:8000"]


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'

AUTH_USER_MODEL = 'user.Gamer'


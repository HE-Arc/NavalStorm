# Generated by Django 3.1.7 on 2021-04-13 13:59

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user', '0003_gamer_is_staff'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='gamer',
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.RemoveField(
            model_name='gamer',
            name='email',
        ),
        migrations.RemoveField(
            model_name='gamer',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='gamer',
            name='id',
        ),
        migrations.RemoveField(
            model_name='gamer',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='gamer',
            name='is_staff',
        ),
        migrations.RemoveField(
            model_name='gamer',
            name='is_superuser',
        ),
        migrations.RemoveField(
            model_name='gamer',
            name='last_login',
        ),
        migrations.RemoveField(
            model_name='gamer',
            name='password',
        ),
        migrations.RemoveField(
            model_name='gamer',
            name='user_permissions',
        ),
        migrations.RemoveField(
            model_name='gamer',
            name='username',
        ),
        migrations.AddField(
            model_name='gamer',
            name='user_ptr',
            field=models.OneToOneField(auto_created=True, default=1, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='auth.user'),
            preserve_default=False,
        ),
    ]
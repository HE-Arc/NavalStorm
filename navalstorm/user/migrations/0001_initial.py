<<<<<<< HEAD:navalstorm/userApp/migrations/0001_initial.py
# Generated by Django 3.1.7 on 2021-03-07 20:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Gamer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('winNumber', models.IntegerField()),
                ('playedGameNumber', models.IntegerField()),
                ('avatar', models.ImageField(upload_to='data/avatar')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
=======
# Generated by Django 3.1.7 on 2021-04-16 08:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Gamer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.ImageField(blank=True, default='', null=True, upload_to='avatars/')),
                ('winNumber', models.IntegerField(default=0, verbose_name='winNumber')),
                ('playedGameNumber', models.IntegerField(default=0, verbose_name='playedGameNumber')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
>>>>>>> issue-30-Bug_on_login:navalstorm/user/migrations/0001_initial.py

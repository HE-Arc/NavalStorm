# Generated by Django 3.2 on 2021-04-19 05:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import jsonfield.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Board',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', jsonfield.fields.JSONField()),
                ('idUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Servers',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('password', models.CharField(blank=True, max_length=255)),
                ('first_board', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='First_Board', to='game.board')),
                ('first_player', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='First_player', to='user.navalstormuser')),
                ('second_board', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Second_Board', to='game.board')),
                ('second_player', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Second_player', to='user.navalstormuser')),
            ],
        ),
    ]

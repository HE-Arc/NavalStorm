# Generated by Django 3.1.7 on 2021-04-08 12:21

from django.db import migrations, models
import user.managers


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='gamer',
            options={'verbose_name': 'user', 'verbose_name_plural': 'users'},
        ),
        migrations.AlterModelManagers(
            name='gamer',
            managers=[
                ('objects', user.managers.UserManager()),
            ],
        ),
        migrations.RemoveField(
            model_name='gamer',
            name='user',
        ),
        migrations.AddField(
            model_name='gamer',
            name='email',
            field=models.EmailField(default='', max_length=254, unique=True, verbose_name='email address'),
        ),
        migrations.AddField(
            model_name='gamer',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='gamer',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='active'),
        ),
        migrations.AddField(
            model_name='gamer',
            name='is_superuser',
            field=models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status'),
        ),
        migrations.AddField(
            model_name='gamer',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='gamer',
            name='password',
            field=models.CharField(default='', max_length=128, verbose_name='password'),
        ),
        migrations.AddField(
            model_name='gamer',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
        migrations.AddField(
            model_name='gamer',
            name='username',
            field=models.CharField(default='', max_length=30, verbose_name='username'),
        ),
        migrations.AlterField(
            model_name='gamer',
            name='avatar',
            field=models.ImageField(blank=True, default='', null=True, upload_to='avatars/'),
        ),
        migrations.AlterField(
            model_name='gamer',
            name='playedGameNumber',
            field=models.IntegerField(default=0, verbose_name='playedGameNumber'),
        ),
        migrations.AlterField(
            model_name='gamer',
            name='winNumber',
            field=models.IntegerField(default=0, verbose_name='winNumber'),
        ),
    ]

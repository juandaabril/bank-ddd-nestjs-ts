# Generated by Django 3.1.2 on 2020-10-15 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomerModel',
            fields=[
                ('id', models.UUIDField(editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'customer',
            },
        ),
    ]

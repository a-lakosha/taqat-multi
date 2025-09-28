# -*- encoding: utf-8 -*-
{
    'name': "Multiple Websites Models",
    'summary': """
        Multiple Websites Models
    """,
    'description': """
        Multiple Websites Models to contain multiple websites Models 
    """,
    'author': "ahmed.loakosha94@gmail.com",
    'contributors': [
        "<Ahmed Lakosha> <<ahmed.loakosha94@gmail.com>>"
        "<Islam Hafez> <<moeslam843@gmail.com>>"
    ],
    'category': 'Website',
    'version': '0.101',
    'depends': ['website', 'website_blog', 'base_address_extended'],
    'data': [
        'security/ir.model.access.csv',

        'data/aboutus.xml',
        'data/programs.xml',
        'data/projects.xml',

        'views/res_company_view.xml',
        'views/partner_views.xml',
        'views/programs_views.xml',
        'views/success_stories_views.xml',
        'views/faqs_views.xml',
    ],
    'images': [
        'static/description/icon.png',
    ],
    'assets': {
        'web.assets_frontend': [
            # 'multiple_websites_models/static/src/js/address.js',
        ]},
    'application': False,
    'license': 'LGPL-3',
}


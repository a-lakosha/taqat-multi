# -*- encoding: utf-8 -*-
{
    'name': "Indoqat",
    'summary': """
        Professional business solutions theme for modern enterprises
    """,
    'description': """
        Indoqat Theme - Complete Business Solutions Platform
        
        A comprehensive Odoo theme designed for businesses offering professional services and solutions. 
        This theme provides a modern.
    """,
    'author': "Ahmed Lakosha",
    'sequence': 1,
    'contributors': [
        "<Ahmed Lakosha>",
    ],
    'category': 'Theme',
    'version': '0.1',
    'depends': ['theme_common', 'social_media', 'mass_mailing', 'website', 'crm',
                'website_hr_recruitment'],
    'data': [
        'views/blogs.xml',
        'views/custom_footer.xml',
        'views/custom_navbar.xml',
        'views/snippets.xml',
        'views/jobs.xml',

        'data/pages/home_page.xml',
        'data/pages/about_page.xml',
        'data/pages/contact_page.xml',
        'data/pages/services_page.xml',

        'data/menus/menu.xml',
        'data/assets.xml'
    ],
    'images': [
        'static/description/indoqat_description.png',
        'static/description/indoqat_screenshot.png',
    ],
    'application': False,
    'license': 'LGPL-3',
}

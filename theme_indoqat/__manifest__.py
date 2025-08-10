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
    'depends': ['theme_common', 'website_blog', 'social_media', 'mass_mailing', 'website',
                'website_hr_recruitment'],
    'data': [
        'views/customize_template.xml',
        'views/blogs.xml',
        'views/jobs.xml',
        'views/snippets.xml',

        'data/pages/home_page.xml',
        'data/pages/about_page.xml',
        'data/pages/contact_page.xml',
        'data/pages/services_page.xml',
    ],
    'images': [
        'static/description/indoqat_description.png',
        'static/description/indoqat_screenshot.png',
    ],
    'assets': {
        'web.assets_frontend': [
            'theme_indoqat/static/src/lib/bootstrap-icons/bootstrap-icons.css',
            'theme_indoqat/static/src/scss/custom.scss',
            'theme_indoqat/static/src/scss/style1.scss',
            'theme_indoqat/static/src/scss/style2.scss',
            'theme_indoqat/static/src/scss/style3.scss',
            'theme_indoqat/static/src/js/snippets.component.js',
            'theme_indoqat/static/src/js/script.js',
        ],
        'web._assets_primary_variables': [
            'theme_indoqat/static/src/scss/primary_variables.scss',
        ],
    },
    'application': False,
    'license': 'LGPL-3',
}

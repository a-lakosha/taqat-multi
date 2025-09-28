# -*- encoding: utf-8 -*-
{
    'name': "TAQAT",
    'summary': """
        A modern theme for sustainability-focused businesses, entrepreneurs, and humanitarian initiatives.
    """,
    'description': """
    Taqat Theme is designed to showcase projects that drive sustainable growth and economic development. With a clean, 
    modern design, it highlights initiatives in sectors like agriculture, industry, and social impact. The theme 
    emphasizes innovation, collaboration, and responsible investment, making it ideal for businesses and organizations 
    committed to making a difference. It offers intuitive navigation, dynamic content sections, and a professional 
    aesthetic to engage visitors and promote impactful initiatives.
    """,
    'author': "ahmed.loakosha94@gmail.com",
    'sequence': 1,
    'contributors': [
        "<Ahmed Lakosha> <<ahmed.loakosha94@gmail.com>>",
        "<Islam Hafez> <<eslamhafez044@gmail.com>>",
    ],
    'category': 'Theme',
    'version': '0.1',
    'depends': ['theme_common', 'website_blog', 'social_media', 'mass_mailing', 'web', 'website',
                'website_hr_recruitment', 'multiple_websites_models'],
    'data': [
        'views/customize_template.xml',
        'views/blogs.xml',
        'views/jobs.xml',

        'data/pages/home_page.xml',
        'data/pages/about_page.xml',
        'data/pages/contact_page.xml',
        'data/pages/africat_page.xml',
        'data/pages/tawridat_page.xml',
        'data/pages/programs_page.xml',
        'data/pages/projects_page.xml',
        'data/pages/login_page.xml',
        'data/pages/avrasya_page.xml',
    ],
    'images': [
        'static/description/taqat_description.png',
        'static/description/taqat_screenshot.png',
    ],
    'assets': {
        'web.assets_frontend': [
            'theme_taqat/static/src/lib/bootstrap-icons/bootstrap-icons.css',
            'theme_taqat/static/src/lib/owl-carousel/css/owl.carousel.min.css',
            'theme_taqat/static/src/lib/owl-carousel/css/owl.theme.default.min.css',
            'theme_taqat/static/src/lib/owl-carousel/js/owl.carousel.min.js',
            'theme_taqat/static/src/lib/intl-tel-input-25.2.1/build/css/intlTelInput.min.css',
            'theme_taqat/static/src/lib/intl-tel-input-25.2.1/build/js/intlTelInputWithUtils.js',
            'theme_taqat/static/src/js/intlTelInput.js',
            'theme_taqat/static/src/js/lib-call.js',
            'theme_taqat/static/src/js/script.js',
            'theme_taqat/static/src/scss/styles.scss',
            'theme_taqat/static/src/scss/custom.scss',
            'theme_taqat/static/src/scss/style.scss',
            'theme_taqat/static/src/scss/custom_dev.scss',
        ],
        'web._assets_primary_variables': [
            'theme_taqat/static/src/scss/primary_variables.scss',
        ],
    },
    'application': False,
    'license': 'LGPL-3',
}


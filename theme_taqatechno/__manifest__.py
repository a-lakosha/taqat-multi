{
    'name': 'Theme Taqat Techno ',
    'description': 'As an Official Odoo Partner, we help businesses streamline their operations, boost productivity, and drive growth with customized Odoo implementations.',
    'author': 'Sameh Abdelal',
    'contributors': [
        "<Sameh> <<samehashraf947@gmail.com>>",
    ],
    'category': 'Theme',
    'version': '17.0.0.4',
    'depends': ['social_media', 'web', 'website_hr_recruitment', 'website', 'portal', 'mass_mailing',
                'multiple_websites_models', 'website_blog', 'base', 'crm'],
    'license': 'OPL-1',
    'company': 'Pearl Pixels',
    'images': [
        'static/description/taqatechno_description.png',
        'static/description/taqatechno_screenshot.png',
    ],
    'data': [
        # # Pages
        'data/pages/home_page.xml',
        'data/pages/aboutus_page.xml',
        'data/pages/services_page.xml',
        'data/pages/careers_page.xml',
        'data/pages/contactus_page.xml',
        'data/pages/get-start.xml',
        # 'data/pages/success_stories_page.xml',
        # custom
        'views/global_custom.xml',
        'views/custom_footer.xml',
        'views/jobs.xml',
        'views/details_jobs.xml',
        'views/custom_blog.xml',
        #  templates
        'views/templates/cursor_custom.xml'
    ],
    'assets': {
        'web.assets_frontend': [
            'theme_taqatechno/static/src/scss/main.scss',
            'theme_taqatechno/static/src/scss/customize.scss',
            'theme_taqatechno/static/src/js/snippets.component.js',
            # component
            'theme_taqatechno/static/src/component/partner/partner.xml',
            'theme_taqatechno/static/src/component/partner/partner.js',
            'theme_taqatechno/static/src/component/teams/team.xml',
            'theme_taqatechno/static/src/component/teams/team.js',
            'theme_taqatechno/static/src/component/jobs_carers/jobs.js',
            'theme_taqatechno/static/src/component/jobs_carers/jobs.xml',
            'theme_taqatechno/static/src/lib/bootstrap-icons/bootstrap-icons.css',
        ],
        'web._assets_primary_variables': [
            'theme_taqatechno/static/src/scss/primary_variables.scss',
        ],
    },
    'sequence': '1'
}

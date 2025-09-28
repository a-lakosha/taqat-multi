from odoo import models


class ThemeTaqat(models.AbstractModel):
    _inherit = 'theme.utils'

    def _theme_taqat_post_copy(self, mod):
        self.enable_view('website_hr_recruitment.job_filter_by_countries')
        self.enable_view('website_hr_recruitment.job_filter_by_departments')
        self.disable_view('website_hr_recruitment.job_right_side_bar')
        self.disable_view('website.header_social_links')
        self.disable_view('website.footer_custom')

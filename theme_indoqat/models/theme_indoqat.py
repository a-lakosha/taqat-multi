from odoo import models


class ThemeIndoqat(models.AbstractModel):
    _inherit = 'theme.utils'

    def _theme_indoqat_post_copy(self, mod):
        self.disable_view('website.footer_custom')
        self.disable_view('website.header_text_element')
        self.disable_view('website.header_search_box')
        self.enable_view('website.header_language_selector_code, website.header_language_selector_no_text')
        self.disable_view('portal.user_sign_in')

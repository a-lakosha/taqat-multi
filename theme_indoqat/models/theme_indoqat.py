from odoo import models


class ThemeIndoqat(models.AbstractModel):
    _inherit = 'theme.utils'

    def _theme_indoqat_post_copy(self, mod):
        self.disable_view('website.footer_custom')

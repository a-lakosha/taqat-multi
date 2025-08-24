from odoo import models


class ThemeTaqatechno(models.AbstractModel):
    _inherit = 'theme.utils'

    def _theme_taqatechno_post_copy(self, mod):
        self.disable_view('website.header_text_element')
        self.disable_view('website.header_search_box')
        self.disable_view('website_blog.opt_blog_post_tags_display')
        self.disable_view('portal.user_sign_in')

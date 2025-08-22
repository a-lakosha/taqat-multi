import random

from odoo import http
from odoo.http import request


class ThemeTaqaTechnoAPIs(http.Controller):

    @http.route('/api/theme_taqatechno/partner', type='json', auth='public', methods=['POST'], website=True)
    def get_partner(self, **kwargs):
        current_website = http.request.website
        domain = [('website_id', '=', current_website.id)]
        partner_ids = http.request.env['website.partners'].search_read(domain, ['name', 'id'], limit=7)
        return partner_ids

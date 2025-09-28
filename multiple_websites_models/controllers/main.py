import random
from odoo.tools import sql
from odoo import http, fields
from odoo.addons.website_blog.controllers.main import WebsiteBlog
from odoo.addons.http_routing.models.ir_http import slug
from odoo.addons.website.controllers.main import QueryURL
from odoo.http import request
from odoo import http
from odoo.addons.website.controllers.main import Website


class MultiWebsite(Website):
    def index(self, **kw):
        # Call the parent index method without the extra self parameter
        res = super(MultiWebsite, self).index(**kw)

        # Get the current website and define the domain
        current_website = http.request.website
        domain = [('website_id', '=', current_website.id)]

        # Retrieve additional data
        partner_ids = http.request.env['website.partners'].sudo().search(domain)
        programs = http.request.env['website.programs'].sudo().search(domain)
        latest_posts = http.request.env['blog.post'].sudo().search(
            [("website_published", "=", True), ("post_date", "<=", fields.Datetime.now())],
            order="post_date desc", limit=6
        )
        # Update the context of the parent response with new data
        res.qcontext.update({
            'partner_ids': partner_ids,
            'programs': programs,
            'latest_posts': latest_posts,
        })

        print(res.qcontext)
        return res

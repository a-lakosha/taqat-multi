from odoo import models, fields


class WebsitePartners(models.Model):
    _name = "website.partners"
    _order = "sequence, id"

    name = fields.Char('Partner Name', translate=True)
    image = fields.Binary('Image', store=True)
    sequence = fields.Integer('Sequence', default=10)
    website_id = fields.Many2one('website', string='Website', default=lambda self: self.env.company.website_id.id)
    company_id = fields.Many2one('res.company', string='Company', change_default=True,
                                 default=lambda self: self.env.company)
    company_filter = fields.Selection(related='company_id.multi_website_filter')

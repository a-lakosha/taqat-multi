from odoo import models, fields


class WebsiteTeam(models.Model):
    _name = 'website.team'
    _description = 'website team'
    _order = "sequence, id"
    img_url = fields.Binary('image')
    name = fields.Char('name', translate=True)
    job_title = fields.Char('Jop Title', translate=True)
    sequence = fields.Integer("Sequence", default=10)
    website_id = fields.Many2one('website', string='Website', default=lambda self: self.env.company.website_id.id)
    company_id = fields.Many2one('res.company', string='Company', change_default=True,
                                 default=lambda self: self.env.company)
    company_filter = fields.Selection(related='company_id.multi_website_filter')

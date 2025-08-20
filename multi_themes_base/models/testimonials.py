from odoo import models, fields


class WebsiteTeam(models.Model):
    _name = 'testimonials.model'
    _inherit = 'multi.themes.base.mixin'
    _description = 'Testimonials team'
    
    img_url = fields.Binary('image')
    name = fields.Char('name', translate=True)
    description = fields.Char('Description', translate=True)
    job_title = fields.Char('Jop Title', translate=True)
    sequence = fields.Integer("Sequence", default=10)

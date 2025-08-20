from odoo import models, fields


class WebsiteProjects(models.Model):
    _name = "website.projects"
    _order = "sequence, id"

    website_image = fields.Binary("Project Website Image")
    title = fields.Char("Project Title", translate=True)
    sub_title = fields.Text("Project Sub Title", translate=True)
    desc = fields.Html("Project Description", translate=True)
    sequence = fields.Integer("Sequence", default=10)
    website_id = fields.Many2one('website', string='Website', default=lambda self: self.env.company.website_id.id)
    company_id = fields.Many2one('res.company', string='Company', change_default=True,
                                 default=lambda self: self.env.company)
    company_filter = fields.Selection(related='company_id.multi_website_filter')

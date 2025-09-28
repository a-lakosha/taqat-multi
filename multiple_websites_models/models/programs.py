from odoo import models, fields


class WebsitePrograms(models.Model):
    _name = "website.programs"
    _description = 'Website Programs'
    _order = "sequence, id"

    logo = fields.Binary("Program Logo")
    website_image = fields.Binary("Program Website Image")
    title = fields.Char("Program Label", translate=True)
    desc = fields.Text("Program Description", translate=True)
    details = fields.Text("Program Details", translate=True)
    href = fields.Char("Program Href")
    sequence = fields.Integer("Sequence", default=10)
    website_id = fields.Many2one('website', string='Website', default=lambda self: self.env.company.website_id.id)
    company_id = fields.Many2one('res.company', string='Company', change_default=True,
                                 default=lambda self: self.env.company)
    company_filter = fields.Selection(related='company_id.multi_website_filter')

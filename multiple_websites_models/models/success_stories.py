from odoo import models, fields


class WebsiteSuccessStories(models.Model):
    _name = "website.success.stories"
    _description = 'Website Success Stories'
    _order = "sequence, id"

    image = fields.Binary("Image", required=True)
    title = fields.Char("Title", required=True, translate=True)
    description = fields.Text("Description")
    name = fields.Text("Name")
    job_title = fields.Text("Job Title")
    sequence = fields.Integer("Sequence", default=15)
    website_id = fields.Many2one('website', string='Website', default=lambda self: self.env.company.website_id.id)
    company_id = fields.Many2one('res.company', string='Company', change_default=True,
                                 default=lambda self: self.env.company)
    company_filter = fields.Selection(related='company_id.multi_website_filter')

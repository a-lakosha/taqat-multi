from odoo import models, fields


class WebsitePastAlertsArchive(models.Model):
    _name = "website.past.alerts.archive"
    _order = "sequence, id"

    image = fields.Binary("Disaster Image")
    name = fields.Char("Disaster Name", translate=True)
    affected_areas = fields.Text("Affected Areas", translate=True)
    affected_areas_description = fields.Text("Affected Areas Description", translate=True)
    size_of_intervention = fields.Char("Size of Intervention")
    number_of_beneficiaries = fields.Char("Number of Beneficiaries")
    
    sequence = fields.Integer("Sequence", default=15)
    website_id = fields.Many2one('website', string='Website', default=lambda self: self.env.company.website_id.id)
    company_id = fields.Many2one('res.company', string='Company', change_default=True,
                                 default=lambda self: self.env.company)
    company_filter = fields.Selection(related='company_id.multi_website_filter')

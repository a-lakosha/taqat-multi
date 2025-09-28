from odoo import api, fields, models
import base64
from io import BytesIO


class ResCompany(models.Model):
    _inherit = 'res.company'

    multi_website_filter = fields.Selection([
        ('taqat', 'Taqat'),
        ('pearl_pixels', 'Pearl Pixels'),
        ('relief_center', 'Relief Center'),
    ])

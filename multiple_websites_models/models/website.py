
import base64
import fnmatch
import hashlib
import inspect
import json
import logging
import re
import requests
import threading

from lxml import etree, html
from psycopg2 import sql
from werkzeug import urls
from werkzeug.datastructures import OrderedMultiDict
from werkzeug.exceptions import NotFound

from odoo import api, fields, models, tools, http, release, registry
from odoo.addons.http_routing.models.ir_http import RequestUID, slugify, url_for
from odoo.addons.website.models.ir_http import sitemap_qs2dom
from odoo.addons.website.tools import similarity_score, text_from_html, get_base_domain
from odoo.addons.portal.controllers.portal import pager
from odoo.addons.iap.tools import iap_tools
from odoo.exceptions import AccessError, MissingError, UserError, ValidationError
from odoo.http import request
from odoo.modules.module import get_manifest
from odoo.osv.expression import AND, OR, FALSE_DOMAIN, get_unaccent_wrapper
from odoo.tools.translate import _, xml_translate
from odoo.tools import escape_psql, pycompat

class Website(models.Model):
    _inherit = "website"

    def get_suggested_controllers(self):
        """
            Returns a tuple (name, url, icon).
            Where icon can be a module name, or a path
        """
        suggested_controllers = super(Website, self).get_suggested_controllers()
        suggested_controllers.append((_('About us'), url_for('/aboutus'), 'multiple_websites_models'))
        suggested_controllers.append((_('Programs'), url_for('/programs'), 'multiple_websites_models'))
        suggested_controllers.append((_('Projects'), url_for('/projects'), 'multiple_websites_models'))
        return suggested_controllers

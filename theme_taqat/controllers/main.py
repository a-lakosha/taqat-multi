import random
from odoo.tools import sql
from odoo import http, fields
from odoo.addons.website_blog.controllers.main import WebsiteBlog
from odoo.addons.http_routing.models.ir_http import slug
from odoo.addons.website.controllers.main import QueryURL
from odoo.http import request
from odoo import http
from odoo.addons.website.controllers.main import Website


class CustomWebsiteBlog(WebsiteBlog):
    def _prepare_blog_values(self, blogs, blog=False, date_begin=False, date_end=False, tags=False, state=False,
                             page=False, search=None, **post):
        """ Extend the original method to include top_posts """
        values = super()._prepare_blog_values(blogs, blog, date_begin, date_end, tags, state, page, search, **post)

        top_posts = request.env['blog.post'].sudo().search(
            [("website_published", "=", True), ("post_date", "<=", fields.Datetime.now())], order="visits desc",
            limit=6)
        print(top_posts)
        values['top_posts'] = top_posts

        return values

    @http.route([
        '''/blog/<model("blog.blog"):blog>/<model("blog.post", "[('blog_id','=',blog.id)]"):blog_post>''',
    ], type='http', auth="public", website=True, sitemap=True)
    def blog_post(self, blog, blog_post, tag_id=None, page=1, enable_editor=None, **post):
        """ Prepare all values to display the blog.

        :return dict values: values for the templates, containing

         - 'blog_post': browse of the current post
         - 'blog': browse of the current blog
         - 'blogs': list of browse records of blogs
         - 'tag': current tag, if tag_id in parameters
         - 'tags': all tags, for tag-based navigation
         - 'pager': a pager on the comments
         - 'nav_list': a dict [year][month] for archives navigation
         - 'next_post': next blog post, to direct the user towards the next interesting post
        """
        BlogPost = request.env['blog.post']
        date_begin, date_end = post.get('date_begin'), post.get('date_end')

        domain = request.website.website_domain()
        blogs = blog.search(domain, order="create_date, id asc")

        tag = None
        if tag_id:
            tag = request.env['blog.tag'].browse(int(tag_id))
        blog_url = QueryURL('', ['blog', 'tag'], blog=blog_post.blog_id, tag=tag, date_begin=date_begin,
                            date_end=date_end)

        if not blog_post.blog_id.id == blog.id:
            return request.redirect("/blog/%s/%s" % (slug(blog_post.blog_id), slug(blog_post)), code=301)

        tags = request.env['blog.tag'].search([])

        # Find next Post
        blog_post_domain = [('blog_id', '=', blog.id)]
        if not request.env.user.has_group('website.group_website_designer'):
            blog_post_domain += [('post_date', '<=', fields.Datetime.now())]

        all_post = BlogPost.search(blog_post_domain)

        if blog_post not in all_post:
            return request.redirect("/blog/%s" % (slug(blog_post.blog_id)))

        # should always return at least the current post
        all_post_ids = all_post.ids
        current_blog_post_index = all_post_ids.index(blog_post.id)
        nb_posts = len(all_post_ids)
        next_post_id = all_post_ids[(current_blog_post_index + 1) % nb_posts] if nb_posts > 1 else None
        next_post = next_post_id and BlogPost.browse(next_post_id) or False

        alternative_posts = BlogPost.search([
            ("website_published", "=", True),
            ("post_date", "<=", fields.Datetime.now()),
            ('id', '!=', blog_post.id)
        ])
        if len(alternative_posts) > 4:
            alternative_posts = random.sample(alternative_posts, 4)

        values = {
            'tags': tags,
            'tag': tag,
            'blog': blog,
            'blog_post': blog_post,
            'blogs': blogs,
            'main_object': blog_post,
            'nav_list': self.nav_list(blog),
            'enable_editor': enable_editor,
            'next_post': next_post,
            'alternative_posts': alternative_posts,
            'date': date_begin,
            'blog_url': blog_url,
        }

        response = request.render("website_blog.blog_post_complete", values)

        if blog_post.id not in request.session.get('posts_viewed', []):
            if sql.increment_fields_skiplock(blog_post, 'visits'):
                if not request.session.get('posts_viewed'):
                    request.session['posts_viewed'] = []
                request.session['posts_viewed'].append(blog_post.id)
                request.session.touch()
        return response

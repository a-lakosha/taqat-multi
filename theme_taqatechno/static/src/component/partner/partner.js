/** @odoo-module **/

import {Component, onWillStart, useState} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";
import {registry} from "@web/core/registry";

export class partners extends Component {
    setup() {
        this.state = useState({
            partner: [],
            loading: false,
        });
        this.rpc = useService("rpc");
        onWillStart(async () => {
            await this.fetchData();
        });
    }

    async fetchData() {
        try {
            const result = await this.rpc("/api/theme_taqatechno/partner");
            if (result && !result.error) {
                this.state.partner = result || [];
                this.state.loading = true;
            } else {
                console.error(
                    "Error fetching partners data:",
                    result?.message || "Unknown error"
                );
                this.state.loading = false;
            }
        } catch (error) {
            console.error("Failed to fetch partners data:", error);
            this.state.loading = false;
        }
    }

    static template = "theme_taqatechno.partners";
}

registry
    .category("public_components")
    .add("theme_taqatechno.partners", partners);

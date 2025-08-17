/** @odoo-module **/

import {Component, onWillStart, useState} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";
import {registry} from "@web/core/registry";

export class Jobs extends Component {
    setup() {
        this.state = useState({
            jobs: [],
            loading: true,
            total: "",
        });
        this.rpc = useService("rpc");

        onWillStart(async () => {
            await this.fetchData();
        });
    }

    async fetchData() {
        try {
            const result = await this.rpc("/api/theme_taqatechno/jobs");
            if (result && !result.error) {
                this.state.loading = false;
                this.state.jobs = result.data || [];
            } else {
                console.error("Error fetching jobs data:", result.message);
            }
        } catch (error) {
            console.error("Failed to fetch jobs data:", error);
        } finally {
            this.state.loading = false;
        }
    }

    formatDate(date) {
        if (!date) return "";
        const dateObj = new Date(date);
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }).format(dateObj);
    }

    static template = "theme_taqatechno.jobs";
}

registry.category("public_components").add("theme_taqatechno.jobs", Jobs);

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Invitation } from "../models/invitation";

@Injectable({
    providedIn: "root"
})
export class ServiceService {
    constructor(private http: HttpClient) {}

    private URL_BASE = `${environment.API_URL}/goinvity`;

    createInvite(invitation: Invitation, isPro: boolean) {
        return this.http.post<{ _id: string; url: string }>(`${this.URL_BASE}/invitation`, { ...invitation, isPro });
    }

    findInvite(id: string) {
        return this.http.get<Invitation>(`${this.URL_BASE}/invitation/${id}`);
    }

    uploadFile(id: string, file: File) {
        const formData = new FormData();
        formData.append("file", file);

        return this.http.post<Invitation>(`${this.URL_BASE}/invitation/${id}/image`, formData);
    }
}

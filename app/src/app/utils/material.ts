import { MatPaginatorIntl } from "@angular/material/paginator";

export class CustomPaginator extends MatPaginatorIntl {
    override itemsPerPageLabel = "Itens por página";
    override nextPageLabel = "Próxima página";
    override previousPageLabel = "Página anterior";
    override firstPageLabel = "Primeira página";
    override lastPageLabel = "Última página";
}

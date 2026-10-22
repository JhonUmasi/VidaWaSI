# Formato SRII, versión1

Archivo JSON UTF-8 con extensión .srii, sin ejecutables ni referencias externas.

- `format`: `srii-coordinator`; `version`:1.
- `projectId`: identificador de información de proyecto Revit; `revision`: fecha UTC de modificación del RVT fuente.
- `exportedAt`, `source`, `name`, `units`, `criteria`.
- `objects`: lista de elementos con `id` (UniqueId Revit), `revitId`, `mark`, `name`, `kind`, `material`, `color`, `volume`, `area`, `weight`, `density`, `paint`, `boltDiameter`, `notes`, `positions`.
- `positions`: triángulos no indexados en metros,9 valores por triángulo. Coordenadas glTF/web: X=RevitX,Y=RevitZ,Z=-RevitY. Una malla por elemento; los sólidos de un conjunto conservan el mismo identificador.
- `weight`: kg; `volume`: m³; `area`: superficie geométrica total en m².
- `paint`: `revisar` o `excluido`, clasificación inicial; no confirma un sistema de pintura.
- `progress` opcional: el objeto de avance descrito abajo.

## Avance
`format`: `srii-progress`; `version`:1; `projectId` y `revision` deben coincidir con el modelo.
`paintIds`: identificadores de las piezas incluidas en pintura.
`tasks`: `{id,name,ids,done,notes}`. `ids` fija el alcance; `done` guarda los identificadores concluidos. Para la tarea `pintura`, el alcance se toma de `paintIds`.
`updatedAt`: fecha ISO del último registro.
No hay identidad autenticada, firma ni historial de auditoría. Los checks no son evidencia de inspección ni actas de conformidad.

## GLB
Geometría equivalente en glTF2.0. Cada nodo contiene propiedades del elemento en `extras`; los criterios y la identificación del proyecto están en `asset.extras`. El GLB no reemplaza el .srii para guardar avance en esta aplicación.

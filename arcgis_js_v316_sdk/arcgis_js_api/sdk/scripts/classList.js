var classList = ["esri.Map", "esri/layers.Layer", "esri/layers.MapImage", "esri/layers.GraphicsLayer", "esri/layers.DynamicMapServiceLayer", "esri/layers.ArcGISTiledMapServiceLayer", "esri/layers.ArcGISDynamicMapServiceLayer", "esri.Graphic", "esri/geometry.Geometry", "esri/geometry.Point", "esri/geometry.Extent", "esri/geometry.Polyline", "esri/geometry.Polygon", "esri/symbols.Symbol", "esri/symbols.MarkerSymbol", "esri/symbols.LineSymbol", "esri/symbols.PictureMarkerSymbol", "esri/symbols.SimpleFillSymbol", "esri/symbols.FillSymbol", "esri/symbols.SimpleLineSymbol", "esri/layers.ImageParameters", "esri.InfoTemplate", "esri/layers.LayerInfo", "esri/symbols.SimpleMarkerSymbol", "esri/tasks.AddressCandidate", "esri/tasks.DataFile", "esri/tasks.FindParameters", "esri/tasks.FindTask", "esri/tasks.Geoprocessor", "esri/tasks.IdentifyParameters", "esri/tasks.FindResult", "esri/tasks.FeatureSet", "esri/tasks.IdentifyResult", "esri/tasks.IdentifyTask", "esri/tasks.JobInfo", "esri/tasks.LinearUnit", "esri/tasks.Locator", "esri/tasks.ParameterValue", "esri/tasks.Query", "esri/tasks.QueryTask", "esri/tasks.RasterData", "esri.SpatialReference", "esri/layers.LOD", "esri/symbols.CartographicLineSymbol", "esri/geometry.Multipoint", "esri/tasks.GeometryService", "esri/toolbars.Draw", "esri/toolbars.Navigation", "esri/tasks.GPMessage", "esri/dijit.InfoWindow", "esri/tasks.BufferParameters", "esri/symbols.PictureFillSymbol", "esri/symbols.TextSymbol", "esri/symbols.Font", "esri/tasks.Date", "esri/layers.TiledMapServiceLayer", "esri/layers.ArcGISImageServiceLayer", "esri/layers.ImageServiceParameters", "esri/layers.TileInfo", "esri/renderers.Renderer", "esri/virtualearth.VETiledLayer", "esri/renderers.SimpleRenderer", "esri/renderers.UniqueValueRenderer", "esri/renderers.ClassBreaksRenderer", "esri/virtualearth.VEGeocoder", "esri/virtualearth.VEGeocodeResult", "esri/virtualearth.VEAddress", "esri/tasks.NAOutputLine", "esri/tasks.NAUTurn", "esri/tasks.RouteParameters", "esri/tasks.DataLayer", "esri/tasks.RouteTask", "esri/tasks.RouteResult", "esri/tasks.DirectionsFeatureSet", "esri.Units", "esri/layers.FeatureLayer", "esri/layers.FeatureType", "esri/layers.Field", "esri/layers.Domain", "esri/layers.RangeDomain", "esri/layers.FeatureEditResult", "esri/tasks.AreasAndLengthsParameters", "esri/tasks.LengthsParameters", "esri/tasks.RelationParameters", "esri.TimeExtent", "esri/layers.TimeReference", "esri/layers.LayerTimeOptions", "esri/layers.TimeInfo", "esri/layers.FeatureTemplate", "esri/tasks.RelationshipQuery", "esri/toolbars.Edit", "esri/dijit.AttributeInspector", "esri/dijit/editing.TemplatePicker", "esri/dijit/editing.Editor", "esri/dijit.TimeSlider", "esri/tasks.DistanceParameters", "esri/tasks.GeneralizeParameters", "esri/tasks.OffsetParameters", "esri/tasks.TrimExtendParameters", "esri/dijit/editing.AttachmentEditor", "esri/tasks.NAMessage", "esri/tasks.ClosestFacilityParameters", "esri/tasks.ClosestFacilityTask", "esri/tasks.ClosestFacilitySolveResult", "esri/tasks.ServiceAreaParameters", "esri/tasks.ServiceAreaTask", "esri/tasks.ServiceAreaSolveResult", "esri/layers.MosaicRule", "esri/layers.RasterFunction", "esri/renderers.TemporalRenderer", "esri/renderers.SymbolAger", "esri/renderers.TimeRampAger", "esri/renderers.TimeClassBreaksAger", "esri/tasks.NAOutputPolygon", "esri/tasks.NATravelDirection", "esri/dijit.OverviewMap", "esri/layers.InheritedDomain", "esri/layers.OpenStreetMapLayer", "esri/tasks.ImageServiceIdentifyTask", "esri/tasks.ImageServiceIdentifyParameters", "esri/tasks.ImageServiceIdentifyResult", "esri/dijit.BasemapGallery", "esri/dijit.Legend", "esri/dijit.Scalebar", "esri/layers.WMSLayer", "esri/layers.WMSLayerInfo", "esri/dijit.Basemap", "esri.InfoWindowBase", "esri.UndoManager", "esri.OperationBase", "esri/dijit/editing.Add", "esri/dijit/editing.Delete", "esri/dijit/editing.Update", "esri/dijit/editing.Cut", "esri/dijit/editing.Union", "esri/dijit.Gallery", "esri/dijit.Measurement", "esri.SnappingManager", "esri/dijit.Popup", "esri/dijit.PopupTemplate", "esri/layers.WMTSLayer", "esri/layers.WMTSLayerInfo", "esri/dijit.PopupMobile", "esri/layers.KMLLayer", "esri/layers.KMLFolder", "esri/layers.MapImageLayer", "esri/layers.KMLGroundOverlay", "esri.Credential", "esri/dijit.Bookmarks", "esri.IdentityManagerBase", "esri.IdentityManager", "esri.ServerInfo", "esri/dijit.BookmarkItem", "esri/tasks.StatisticDefinition", "esri/tasks.GenerateRendererTask", "esri/tasks.GenerateRendererParameters", "esri/tasks.ClassificationDefinition", "esri/tasks.ClassBreaksDefinition", "esri/tasks.UniqueValueDefinition", "esri/tasks.AlgorithmicColorRamp", "esri/tasks.MultipartColorRamp", "esri/dijit.Print", "esri/tasks.PrintTask", "esri/tasks.PrintParameters", "esri/tasks.PrintTemplate", "esri/layers.DynamicLayerInfo", "esri/layers.LayerMapSource", "esri/layers.LayerDataSource", "esri/layers.TableDataSource", "esri/layers.QueryDataSource", "esri/layers.JoinDataSource", "esri/layers.RasterDataSource", "esri/layers.LayerDrawingOptions", "esri/arcgis.Portal", "esri/arcgis.PortalUser", "esri/arcgis.PortalFolder", "esri/arcgis.PortalGroup", "esri/arcgis.PortalItem", "esri/arcgis.PortalComment", "esri/arcgis.PortalRating", "esri/arcgis.PortalQueryResult", "esri/tasks.ProjectParameters", "esri/tasks.LegendLayer", "esri/dijit.Gauge", "esri/dijit.Attribution", "esri/layers.WebTiledLayer", "esri/layers.GeoRSSLayer", "esri/layers.CodedValueDomain", "esri/dijit.Geocoder", "esri/geometry.ScreenPoint", "esri/dijit.Directions", "esri/dijit.BasemapLayer", "esri/dijit.InfoWindowLite", "esri/layers.StreamLayer", "esri/dijit/analysis.AnalysisBase", "esri/dijit/analysis.AggregatePoints", "esri/dijit/analysis.CreateBuffers", "esri/dijit/analysis.CreateDriveTimeAreas", "esri/dijit/analysis.OverlayLayers", "esri/dijit/analysis.FindHotSpots", "esri/dijit/analysis.SummarizeNearby", "esri/dijit/analysis.SummarizeWithin", "esri/dijit/analysis.EnrichLayer", "esri/dijit/analysis.DissolveBoundaries", "esri/dijit/analysis.ExtractData", "esri/dijit/analysis.FindNearest", "esri/dijit.HistogramTimeSlider", "esri/dijit/geoenrichment.Infographic", "esri/dijit/geoenrichment.InfographicsCarousel", "esri/dijit/geoenrichment.InfographicsOptions", "esri/dijit/geoenrichment.InfographicsOptionsItem", "esri/tasks/geoenrichment.StudyArea", "esri/tasks/geoenrichment.GeographyLevel", "esri/tasks/geoenrichment.GeometryStudyArea", "esri/tasks/geoenrichment.AddressStudyArea", "esri/tasks/geoenrichment.StandardGeographyStudyArea", "esri/tasks/geoenrichment.RingBuffer", "esri/tasks/geoenrichment.DriveBuffer", "esri/tasks/geoenrichment.IntersectingGeographies", "esri/dijit/analysis.MergeLayers", "esri/layers.LabelClass", "esri/tasks/geoenrichment.DriveUnits", "esri/dijit.BasemapToggle", "esri/dijit.HomeButton", "esri/dijit.LayerSwipe", "esri/dijit.LocateButton", "esri/renderers.ScaleDependentRenderer", "esri/layers.LabelLayer", "esri/renderers.DotDensityRenderer", "esri/geometry.esri/geometry/geodesicUtils", "esri/arcgis.esri/arcgis/utils", "esri.esri/config", "esri.esri/domUtils", "esri/geometry.esri/geometry/jsonUtils", "esri/geometry.esri/geometry/mathUtils", "esri/geometry.esri/geometry/normalizeUtils", "esri/geometry.esri/geometry/scaleUtils", "esri/geometry.esri/geometry/screenUtils", "esri/geometry.esri/geometry/webMercatorUtils", "esri.esri/graphicsUtils", "esri.esri/kernel", "esri.esri/lang", "esri/renderers.esri/renderers/jsonUtils", "esri.esri/request", "esri/symbols.esri/symbols/jsonUtils", "esri.esri/urlUtils", "esri/geometry.Circle", "esri/layers.CSVLayer", "esri.Color", "esri/process.SpatialIndex", "esri/process.Processor", "esri/workers.WorkerClient", "esri/plugins.esri/plugins/spatialIndex", "esri/arcgis.OAuthInfo", "esri/dijit/geoenrichment.DataBrowser", "esri/renderers.HeatmapRenderer", "esri/layers.DimensionalDefinition", "esri/styles.esri/styles/basic", "esri/styles.esri/styles/type", "esri/styles.esri/styles/size", "esri/styles.esri/styles/choropleth", "esri/dijit/analysis.CalculateDensity", "esri/dijit/analysis.ConnectOriginsToDestinations", "esri/dijit/analysis.CreateViewshed", "esri/dijit/analysis.CreateWatersheds", "esri/dijit/analysis.DeriveNewLocations", "esri/dijit/analysis.FindExistingLocations", "esri/dijit/analysis.FindSimilarLocations", "esri/dijit/analysis.InterpolatePoints", "esri/dijit/analysis.PlanRoutes", "esri/dijit/analysis.TraceDownstream", "esri/tasks.NATypes", "esri/tasks.DensifyParameters", "esri/tasks.ColorRamp", "esri/layers.DataSource", "esri/layers.LayerSource", "esri.esri/basemaps", "esri/tasks/locationproviders.LocationProviderBase", "esri/tasks/locationproviders.LocationProviderClientBase", "esri/tasks/locationproviders.CoordinatesLocationProvider", "esri/tasks/locationproviders.GeometryLocationProvider", "esri/tasks/locationproviders.LocationProviderRemoteBase", "esri/tasks/locationproviders.LocatorLocationProvider", "esri/tasks/locationproviders.QueryTaskLocationProvider", "esri/tasks/locationproviders.StandardGeographyQueryLocationProvider", "esri/dijit.FeatureTable", "esri/tasks/geoenrichment.GeographyQueryBase", "esri/tasks/geoenrichment.StandardGeographyQueryTask", "esri/tasks/geoenrichment.GeographyQuery", "esri/tasks/geoenrichment.SubGeographyQuery", "esri/layers.DataAdapterFeatureLayer", "esri/dijit.Search", "esri/plugins.FeatureLayerStatistics", "esri/styles.esri/styles/heatmap", "esri/dijit.ColorPicker", "esri/dijit.HorizontalSlider", "esri/dijit.SymbolStyler", "esri/dijit.VisibleScaleRangeSlider", "esri/dijit.RendererSlider", "esri/dijit.ColorInfoSlider", "esri/dijit.ClassedColorSlider", "esri/dijit.SizeInfoSlider", "esri/renderers.esri/renderers/smartMapping", "esri/layers.ArcGISImageServiceVectorLayer", "esri/renderers.VectorFieldRenderer", "esri/layers.RasterLayer", "esri/dijit/util.esri/dijit/util/busyIndicator", "esri/geometry.esri/geometry/geometryEngine", "esri/dijit.ClassedSizeSlider", "esri/dijit.OpacitySlider", "esri/dijit.HeatmapSlider", "esri/layers.PixelBlock", "esri/geometry.esri/geometry/geometryEngineAsync", "esri/layers.WFSLayer", "esri/tasks/datareviewer.BatchValidationJob", "esri/tasks/datareviewer.BatchValidationJobInfo", "esri/tasks/datareviewer.BatchValidationParameters", "esri/tasks/datareviewer.BatchValidationTask", "esri/tasks/datareviewer.DashboardResult", "esri/tasks/datareviewer.DashboardTask", "esri/tasks/datareviewer.GetResultsQueryParameters", "esri/tasks/datareviewer.ReviewerAttributes", "esri/tasks/datareviewer.ReviewerFilters", "esri/tasks/datareviewer.esri/tasks/datareviewer/ReviewerLifecycle", "esri/tasks/datareviewer.ReviewerResultsTask", "esri/tasks/datareviewer.ReviewerSession", "esri/tasks/datareviewer.SessionOptions", "esri/opsdashboard.WidgetProxy", "esri/opsdashboard.MapToolProxy", "esri/opsdashboard.featureActionProxy", "esri/opsdashboard.WidgetConfigurationProxy", "esri/opsdashboard.MapToolConfigurationProxy", "esri/opsdashboard.FeatureActionConfigurationProxy", "esri/opsdashboard.FeatureActionFeatures", "esri/opsdashboard.DataSourceProxy", "esri/opsdashboard.GraphicsLayerProxy", "esri/dijit.LayerList", "esri/dijit.ElevationProfile", "esri/opsdashboard.ExtensionConfigurationBase", "esri/opsdashboard.ExtensionBase", "esri/opsdashboard.MapWidgetProxy", "esri/renderers.BlendRenderer", "esri/tasks.ImageServiceMeasureTask", "esri/tasks.ImageServiceMeasureParameters", "esri/toolbars.ImageServiceMeasureTool", "esri/dijit.ImageServiceMeasure", "esri.ImageSpatialReference", "esri/dijit.ObliqueViewer", "esri/layers.VectorTileLayer", "esri/dijit/analysis.ChooseBestFacilities"];
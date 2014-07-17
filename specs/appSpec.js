describe("Tienda Fantastica", function () {
    beforeEach(module("MiCarrito"));
    var carritoSvc;
    beforeEach(inject(function(CarritoServicio) {
        carritoSvc = CarritoServicio;
    }));

    describe("Listar Productos", function () {
        var productoSvc;

        beforeEach(inject(function(ProductoServicio) {
            productoSvc = ProductoServicio;
        }));
        describe("ProductoServicio", function () {
            it("debe listar 8 productos", function () {
                var productos = productoSvc.listar();
                expect(productos.length).toBe(8);
            });
        });
        describe("ProductoControladora", function () {
            var scope = {},
                productoCtrl;
            beforeEach(inject(function($controller) {
                productoCtrl = $controller("ProductoControladora", {
                    $scope: scope,
                    ProductoServicio: productoSvc,
                    CarritoServicio: carritoSvc
                });
            }));
            it("debe iniciar con 8 productos", function () {

                expect(scope.productos.length).toBe(8);
            });
            it("debe agregar un producto al carrito", function () {
                productoCtrl.agregar({});
                expect(scope.carrito.length).toBe(1);
            });
            it("debe agregar un solo producto al carrito", function () {
                productoCtrl.agregar({ Id : 1 });
                productoCtrl.agregar({ Id : 1 });
                expect(scope.carrito.length).toBe(1);
            });
        });
        describe("ProductoVista", function () {

            var viewHtml, scope, view;
            beforeEach(inject(function ($compile, $rootScope) {
                viewHtml =
                    $.ajax("/src/views/producto.html", { async: false})
                        .responseText;
                scope = $rootScope.$new();
                view = $compile(viewHtml)(scope);
            }));

            it("debe listar 2 productos", function () {
                scope.productos = [{}, {}];
                scope.$digest();
                expect(view.find("div.producto").length)
                    .toBe(2);
            });
        });
    });

    describe("Listar Carrito", function () {
        describe("CarritoServicio", function () {
            it("debe ser un arreglo", function () {
                expect(carritoSvc.items instanceof Array).toBe(true);
            });
            it("debe tener 2 item", function () {
                carritoSvc.agregar({ Id: 0 });
                carritoSvc.agregar({ Id: 1 });
                expect(carritoSvc.items.length).toBe(2);
            });
        });
        describe("CarritoControladora", function () {
            var scope = {},
                carritoCtrl;
            beforeEach(inject(function($controller) {
                carritoCtrl = $controller("CarritoControladora", {
                    $scope: scope,
                    CarritoServicio: carritoSvc
                });
            }));
            it("debe iniciar con 1 producto", function () {
                carritoSvc.agregar({ Id: 0 });
                expect(scope.carrito.length).toBe(1);
            });
        });
        describe("CarritoVista", function () {

            var viewHtml, scope, view;
            beforeEach(inject(function ($compile, $rootScope) {
                viewHtml =
                    $.ajax("/src/views/carrito.html", { async: false})
                        .responseText;
                scope = $rootScope.$new();
                view = $compile(viewHtml)(scope);
            }));

            it("debe listar 2 items", function () {
                scope.carrito = [{}, {}];
                scope.$digest();
                expect(view.find("tbody tr").length)
                    .toBe(2);
            });
        });
    });
});
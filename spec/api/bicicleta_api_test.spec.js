var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www')

describe('Bicicleta API', () => {
    describe('GET BICICLETAS /', () => {
    	it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            
        	var a = new Bicicleta(1, 'negra', 'urbana', [-34.6012424, -58.3861497]);
            Bicicleta.add(a);
            
        	request.get('http://localhost:5000/api/bicicletas', (error, response, body) => {
    			expect(response.statusCode).toBe(200);
    		});
    	});
    });
    describe('POST BICICLETAS /create', () => {
    	it('Status 200', (done) => {
            var headers = {'content-type' : 'apllication/json'};
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';
            request.post({
                headers: headers,
                url: 'http://localhost:5000/api/bicicletas/create',
                body: aBici
            }, (error, response, body) => {
    			expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe('rojo');
                done(); //test se termina cuando done se ejecuta
            });
    	});
    });
    describe('POST BICICLETA /update', () => {
		it('STATUS 202', (done) => {
			var a = new Bicicleta(10, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
			Bicicleta.add(a);

			var headers = { 'content-type': 'application/json' };
			var aBici = '{ "id": 10, "color": "verde", "modelo": "urbana", "lat": -34, "lng": -54 }';
			request.put({
				headers: headers,
				url: 'http://localhost:5000/api/bicicletas/10/update',
				body: aBici
			}, (error, response, body) => {
				expect(response.statusCode).toBe(202);
					expect(Bicicleta.findById(10).color).toBe('verde');
					done();
			});
		});
	});
});
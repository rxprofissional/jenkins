# Executar JMeter
docker run --rm -v "C:/Users/Rodrigo/Desktop/jmeter-tests:/tests" -v "C:/Users/Rodrigo/Desktop/jmeter-results:/results" justb4/jmeter -n -t /tests/grupo-usuarios-carga.jmx -l /results/test-results.jtl

# Executar Cypress e salvar evidências
docker run --rm -it -v "C:/Users/Rodrigo/Desktop/e2e:/e2e" -v "C:/Users/Rodrigo/Desktop/e2e/results:/e2e/results" -v "C:/Users/Rodrigo/Desktop/e2e/videos:/e2e/videos" -v "C:/Users/Rodrigo/Desktop/e2e/screenshots:/e2e/screenshots" cypress/included:12.17.1 --headless

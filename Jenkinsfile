pipeline {
    agent any

    stages {
        stage('Start') {
            steps {
                echo 'Iniciando o Pipeline'
            }
        }

        stage('API Teste') {
            steps {
                script {
                    // Verificar e criar o diretório para os relatórios do Newman, se não existir
                    bat '''
                        if not exist "C:\\Pipeline\\newman" (
                            mkdir "C:\\Pipeline\\newman"
                        )
                    '''
                    
                    // Executar o teste de API usando Newman e salvar o relatório em HTML
                    bat '''
                        "C:\\Users\\Rodrigo\\AppData\\Roaming\\npm\\newman" run Integra_ERP_Homolog.json -e postman_globals.json --reporters html --reporter-html-export "C:\\Pipeline\\newman\\report.html"
                    '''

                    // Verificar se o relatório foi gerado
                    if (!fileExists("C:\\Pipeline\\newman\\report.html")) {
                        error("Relatório de API não foi gerado!")
                    }
                }
            }
        }

        stage('Performance Teste') {
            steps {
                script {
                    // Executar o teste de performance com JMeter e salvar o arquivo de resultados
                    bat '''
                        "C:\\Users\\Rodrigo\\Documents\\apache-jmeter-5.6.3\\bin\\jmeter.bat" -n -t "C:\\Users\\Rodrigo\\Documents\\apache-jmeter-5.6.3\\bin\\TestesEcommerceCarga.jmx" -l "C:\\Pipeline\\Resultado2705.jtl"
                    '''

                    // Verificar se o arquivo .jtl foi gerado corretamente
                    if (!fileExists("C:\\Pipeline\\Resultado2705.jtl")) {
                        error("Arquivo de resultado JMeter (.jtl) não foi gerado!")
                    }

                    // Limpar o diretório de relatório do JMeter
                    bat '''
                        if exist "C:\\Pipeline\\JMeterReport" (
                            rmdir /S /Q "C:\\Pipeline\\JMeterReport"
                        )
                    '''

                    // Gerar relatório de performance a partir do arquivo .jtl
                    bat '''
                        "C:\\Users\\Rodrigo\\Documents\\apache-jmeter-5.6.3\\bin\\jmeter.bat" -g "C:\\Pipeline\\Resultado2705.jtl" -o "C:\\Pipeline\\JMeterReport"
                    '''

                    // Verificar se o relatório foi gerado
                    if (!fileExists("C:\\Pipeline\\JMeterReport\\index.html")) {
                        error("Relatório de performance JMeter não foi gerado!")
                    }
                }
            }
        }

        stage('Web Teste') {
            steps {
                bat '''
                    cd C:\\QAweb\\Projetos\\udemy.robot
                    robot --outputdir C:\\Pipeline\\RobotResults tests\\home.robot
                '''
            }
        }

        stage('Mobile Teste') {
            steps {
                bat '''
                    cd C:\\QAmobile\\Projetos\\spotify.robot
                    robot --outputdir C:\\Pipeline\\MobileResults tests\\home.robot
                '''
            }
        }

        stage('Unificar Relatórios') {
            steps {
                script {
                    // Obter data e hora atual para incluir no relatório
                    def date = new Date().format("dd/MM/yyyy HH:mm:ss")

                    // Unificar os relatórios em um único HTML com iframes e personalizações
                    def unifiedReport = 'C:\\Pipeline\\Unificado.html'
                    writeFile file: unifiedReport, text: """
                        <html>
                        <head>
                            <title>Relatório Unificado de Testes</title>
                            <style>
                                body { font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333; margin: 20px; }
                                h1, h2 { color: #1a73e8; }
                                h1 { border-bottom: 2px solid #1a73e8; padding-bottom: 10px; }
                                iframe { border: 2px solid #ddd; margin-top: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
                                .section { margin-bottom: 40px; }
                                .nav { margin-bottom: 20px; }
                                a { color: #1a73e8; text-decoration: none; font-weight: bold; }
                                a:hover { text-decoration: underline; }
                            </style>
                        </head>
                        <body>
                            <h1>Relatório Unificado de Testes</h1>
                            <p><strong>Data de Execução:</strong> ${date}</p>

                            <div class="nav">
                                <ul>
                                    <li><a href="#newman">API Teste - Postman/Newman</a></li>
                                    <li><a href="#jmeter">Performance Teste - JMeter</a></li>
                                    <li><a href="#robot">Web Teste - Robot</a></li>
                                    <li><a href="#mobile">Mobile Teste - Robot</a></li>
                                </ul>
                            </div>

                            <div class="section" id="newman">
                                <h2>API Teste - Postman/Newman</h2>
                                <p>Resultados dos testes de API (Postman/Newman).</p>
                                <iframe src="file:///C:/Pipeline/newman/report.html" width="100%" height="600px"></iframe>
                            </div>

                            <div class="section" id="jmeter">
                                <h2>Performance Teste - JMeter</h2>
                                <p>Resultados dos testes de Performance (JMeter).</p>
                                <iframe src="file:///C:/Pipeline/JMeterReport/index.html" width="100%" height="600px"></iframe>
                            </div>

                            <div class="section" id="robot">
                                <h2>Web Teste - Robot</h2>
                                <p>Resultados dos testes Web (Robot Framework).</p>
                                <iframe src="file:///C:/Pipeline/RobotResults/report.html" width="100%" height="600px"></iframe>
                            </div>

                            <div class="section" id="mobile">
                                <h2>Mobile Teste - Robot</h2>
                                <p>Resultados dos testes Mobile (Robot Framework).</p>
                                <iframe src="file:///C:/Pipeline/MobileResults/report.html" width="100%" height="600px"></iframe>
                            </div>
                        </body>
                        </html>
                    """
                }
            }
        }

        stage('Converter Relatório para PDF') {
            steps {
                script {
                    // Caminho para o HTML unificado
                    def unifiedHtml = 'C:\\Pipeline\\Unificado.html'
                    // Caminho para o PDF de saída
                    def outputPdf = 'C:\\Pipeline\\Relatorio_Unificado.pdf'

                    // Comando para converter HTML em PDF usando wkhtmltopdf com a opção de acesso a arquivos locais
                    bat """
                        "C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe" --enable-local-file-access ${unifiedHtml} ${outputPdf}
                    """

                    // Verificar se o PDF foi gerado
                    if (!fileExists(outputPdf)) {
                        error("Relatório PDF não foi gerado!")
                    }
                }
            }
        }

        stage('Publicar Relatório Unificado') {
            steps {
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'C:\\Pipeline',
                    reportFiles: 'Unificado.html',
                    reportName: 'Relatório Unificado de Testes'
                ])
            }
        }

        stage('Finalizando o Pipeline') {
            steps {
                echo 'Finalizando o Pipeline'
            }
        }
    }
}

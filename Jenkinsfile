pipeline {
    agent any

    stages {
        stage('Clone Repositório') {
            steps {
                script {
                    // Clonar o repositório do GitHub
                    checkout([$class: 'GitSCM', 
                        branches: [[name: '*/main']], 
                        doGenerateSubmoduleConfigurations: false, 
                        extensions: [], 
                        userRemoteConfigs: [[url: 'https://github.com/usuario/repo.git']]
                    ])
                }
            }
        }

        stage('Start') {
            steps {
                echo 'Iniciando o Pipeline'
            }
        }

        stage('API Teste') {
            steps {
                script {
                    def repoDir = env.WORKSPACE
                    
                    // Criar diretório para relatórios Newman
                    bat """
                        if not exist "${repoDir}\\newman" (
                            mkdir "${repoDir}\\newman"
                        )
                        
                        "C:\\Users\\Rodrigo\\AppData\\Roaming\\npm\\newman" run "${repoDir}\\Integra_ERP_Homolog.json" -e "${repoDir}\\postman_globals.json" --reporters html --reporter-html-export "${repoDir}\\newman\\report.html"
                    """

                    // Verificar se o relatório foi gerado
                    if (!fileExists("${repoDir}\\newman\\report.html")) {
                        error("Relatório de API não foi gerado!")
                    }
                }
            }
        }

        stage('Performance Teste') {
            steps {
                script {
                    def repoDir = env.WORKSPACE

                    // Executar testes de performance com JMeter
                    bat """
                        "C:\\Users\\Rodrigo\\Documents\\apache-jmeter-5.6.3\\bin\\jmeter.bat" -n -t "${repoDir}\\TestesEcommerceCarga.jmx" -l "${repoDir}\\Resultado.jtl"
                    """

                    if (!fileExists("${repoDir}\\Resultado.jtl")) {
                        error("Arquivo de resultado JMeter (.jtl) não foi gerado!")
                    }

                    // Gerar relatório de performance
                    bat """
                        "C:\\Users\\Rodrigo\\Documents\\apache-jmeter-5.6.3\\bin\\jmeter.bat" -g "${repoDir}\\Resultado.jtl" -o "${repoDir}\\JMeterReport"
                    """

                    if (!fileExists("${repoDir}\\JMeterReport\\index.html")) {
                        error("Relatório de performance JMeter não foi gerado!")
                    }
                }
            }
        }

        stage('Web Teste') {
            steps {
                script {
                    def repoDir = env.WORKSPACE

                    // Executar testes web com Robot Framework
                    bat """
                        cd "${repoDir}\\web-tests"
                        robot --outputdir "${repoDir}\\RobotResults" tests\\home.robot
                    """
                }
            }
        }

        stage('Mobile Teste') {
            steps {
                script {
                    def repoDir = env.WORKSPACE

                    // Executar testes mobile com Robot Framework
                    bat """
                        cd "${repoDir}\\mobile-tests"
                        robot --outputdir "${repoDir}\\MobileResults" tests\\home.robot
                    """
                }
            }
        }

        stage('Unificar Relatórios') {
            steps {
                script {
                    def repoDir = env.WORKSPACE
                    def date = new Date().format("dd/MM/yyyy HH:mm:ss")

                    writeFile file: "${repoDir}\\Unificado.html", text: """
                        <html>
                        <head>
                            <title>Relatório Unificado de Testes</title>
                            <style>
                                body { font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333; margin: 20px; }
                                h1 { color: #1a73e8; border-bottom: 2px solid #1a73e8; }
                                iframe { border: 1px solid #ddd; margin: 10px 0; }
                            </style>
                        </head>
                        <body>
                            <h1>Relatório Unificado de Testes</h1>
                            <p><strong>Data de Execução:</strong> ${date}</p>

                            <h2>API Teste</h2>
                            <iframe src="file:///${repoDir.replace('\\', '/')}\\newman\\report.html" width="100%" height="400"></iframe>

                            <h2>Performance Teste</h2>
                            <iframe src="file:///${repoDir.replace('\\', '/')}\\JMeterReport\\index.html" width="100%" height="400"></iframe>

                            <h2>Web Teste</h2>
                            <iframe src="file:///${repoDir.replace('\\', '/')}\\RobotResults\\report.html" width="100%" height="400"></iframe>

                            <h2>Mobile Teste</h2>
                            <iframe src="file:///${repoDir.replace('\\', '/')}\\MobileResults\\report.html" width="100%" height="400"></iframe>
                        </body>
                        </html>
                    """
                }
            }
        }

        stage('Converter Relatório para PDF') {
            steps {
                script {
                    def repoDir = env.WORKSPACE

                    bat """
                        "C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe" --enable-local-file-access ${repoDir}\\Unificado.html ${repoDir}\\Relatorio_Unificado.pdf
                    """

                    if (!fileExists("${repoDir}\\Relatorio_Unificado.pdf")) {
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
                    reportDir: env.WORKSPACE,
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

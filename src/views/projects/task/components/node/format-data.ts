/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { omit } from 'lodash'
import type {
  INodeData,
  ITaskData,
  ITaskParams,
  ISqoopTargetParams,
  ISqoopSourceParams,
  ILocalParam,
  IDependentParameters
} from './types'
import { ref } from 'vue'

export function formatParams(data: INodeData): {
  processDefinitionCode: string
  upstreamCodes: string
  taskDefinitionJsonObj: object
} {
  const rdbmsSourceTypes = ref(['MYSQL', 'ORACLE', 'SQLSERVER', 'HANA'])
  const taskParams: ITaskParams = {}
  if (data.taskType === 'SUB_PROCESS' || data.taskType === 'DYNAMIC') {
    taskParams.processDefinitionCode = data.processDefinitionCode
  }

  if (data.taskType === 'JAVA') {
    taskParams.runType = data.runType
    taskParams.mainArgs = data.mainArgs
    taskParams.jvmArgs = data.jvmArgs
    taskParams.isModulePath = data.isModulePath
    if (data.runType === 'JAR' && data.mainJar) {
      taskParams.mainJar = { resourceName: data.mainJar }
    }
  }

  if (
    data.taskType &&
    ['SPARK', 'MR', 'FLINK', 'FLINK_STREAM'].includes(data.taskType)
  ) {
    taskParams.programType = data.programType
    taskParams.mainClass = data.mainClass
    if (data.mainJar) {
      taskParams.mainJar = { resourceName: data.mainJar }
    }
    taskParams.deployMode = data.deployMode
    taskParams.appName = data.appName
    taskParams.mainArgs = data.mainArgs
    taskParams.others = data.others
    if (data.namespace) {
      taskParams.namespace = data.namespace
    }
    taskParams.yarnQueue = data.yarnQueue
  }

  if (data.taskType === 'SPARK') {
    taskParams.master = data.master
    taskParams.driverCores = data.driverCores
    taskParams.driverMemory = data.driverMemory
    taskParams.numExecutors = data.numExecutors
    taskParams.executorMemory = data.executorMemory
    taskParams.executorCores = data.executorCores
    taskParams.sqlExecutionType = data.sqlExecutionType
  }

  if (data.taskType === 'FLINK' || data.taskType === 'FLINK_STREAM') {
    taskParams.flinkVersion = data.flinkVersion
    taskParams.jobManagerMemory = data.jobManagerMemory
    taskParams.taskManagerMemory = data.taskManagerMemory
    taskParams.slot = data.slot
    taskParams.taskManager = data.taskManager
    taskParams.parallelism = data.parallelism
  }
  if (data.taskType === 'HTTP') {
    taskParams.httpMethod = data.httpMethod
    taskParams.httpBody = data.httpBody
    taskParams.httpCheckCondition = data.httpCheckCondition
    taskParams.httpParams = data.httpParams
    taskParams.url = data.url
    taskParams.condition = data.condition
    taskParams.connectTimeout = data.connectTimeout
    taskParams.socketTimeout = data.socketTimeout
  }

  if (data.taskType === 'SQOOP') {
    taskParams.jobType = data.isCustomTask ? 'CUSTOM' : 'TEMPLATE'
    taskParams.localParams = data.localParams
    if (data.isCustomTask) {
      taskParams.customShell = data.customShell
    } else {
      taskParams.jobName = data.jobName
      taskParams.hadoopCustomParams = data.hadoopCustomParams
      taskParams.sqoopAdvancedParams = data.sqoopAdvancedParams
      taskParams.concurrency = data.concurrency
      taskParams.splitBy = data.splitBy
      taskParams.modelType = data.modelType
      taskParams.sourceType = data.sourceType
      taskParams.targetType = data.targetType
      let targetParams: ISqoopTargetParams = {}
      let sourceParams: ISqoopSourceParams = {}
      if (data.targetType === 'HIVE') {
        targetParams = {
          hiveDatabase: data.targetHiveDatabase,
          hiveTable: data.targetHiveTable,
          createHiveTable: data.targetHiveCreateTable,
          dropDelimiter: data.targetHiveDropDelimiter,
          hiveOverWrite: data.targetHiveOverWrite,
          hiveTargetDir: data.targetHiveTargetDir,
          replaceDelimiter: data.targetHiveReplaceDelimiter,
          hivePartitionKey: data.targetHivePartitionKey,
          hivePartitionValue: data.targetHivePartitionValue
        }
      } else if (data.targetType === 'HDFS') {
        targetParams = {
          targetPath: data.targetHdfsTargetPath,
          deleteTargetDir: data.targetHdfsDeleteTargetDir,
          compressionCodec: data.targetHdfsCompressionCodec,
          fileType: data.targetHdfsFileType,
          fieldsTerminated: data.targetHdfsFieldsTerminated,
          linesTerminated: data.targetHdfsLinesTerminated
        }
      } else if (
        rdbmsSourceTypes.value.some((target) => target === data.targetType)
      ) {
        targetParams = {
          targetType: data.targetMysqlType,
          targetDatasource: data.targetMysqlDatasource,
          targetTable: data.targetMysqlTable,
          targetColumns: data.targetMysqlColumns,
          fieldsTerminated: data.targetMysqlFieldsTerminated,
          linesTerminated: data.targetMysqlLinesTerminated,
          isUpdate: data.targetMysqlIsUpdate,
          targetUpdateKey: data.targetMysqlTargetUpdateKey,
          targetUpdateMode: data.targetMysqlUpdateMode
        }
      }
      if (rdbmsSourceTypes.value.some((target) => target === data.sourceType)) {
        sourceParams = {
          srcTable: data.srcQueryType === '1' ? '' : data.srcTable,
          srcColumnType: data.srcQueryType === '1' ? '0' : data.srcColumnType,
          srcColumns:
            data.srcQueryType === '1' || data.srcColumnType === '0'
              ? ''
              : data.srcColumns,
          srcQuerySql:
            data.srcQueryType === '0' ? '' : data.sourceMysqlSrcQuerySql,
          srcQueryType: data.srcQueryType,
          srcType: data.sourceMysqlType,
          srcDatasource: data.sourceMysqlDatasource,
          mapColumnHive: data.mapColumnHive,
          mapColumnJava: data.mapColumnJava
        }
      } else if (data.sourceType === 'HDFS') {
        sourceParams = {
          exportDir: data.sourceHdfsExportDir
        }
      } else if (data.sourceType === 'HIVE') {
        sourceParams = {
          hiveDatabase: data.sourceHiveDatabase,
          hiveTable: data.sourceHiveTable,
          hivePartitionKey: data.sourceHivePartitionKey,
          hivePartitionValue: data.sourceHivePartitionValue
        }
      }
      taskParams.targetParams = JSON.stringify(targetParams)
      taskParams.sourceParams = JSON.stringify(sourceParams)
    }
  }

  if (data.taskType === 'SQL') {
    taskParams.type = data.type
    taskParams.datasource = data.datasource
    taskParams.sql = data.sql
    taskParams.sqlType = data.sqlType
    taskParams.preStatements = data.preStatements
    taskParams.postStatements = data.postStatements
    taskParams.sendEmail = data.sendEmail
    taskParams.displayRows = data.displayRows
    if (data.sqlType === '0' && data.sendEmail) {
      taskParams.title = data.title
      taskParams.groupId = data.groupId
    }
    if (data.type === 'HIVE') {
      if (data.udfs) taskParams.udfs = data.udfs.join(',')
      taskParams.connParams = data.connParams
    }

    if (data.type === 'KYUUBI') {
      if (data.udfs) taskParams.udfs = data.udfs.join(',')
    }
  }

  if (data.taskType === 'PROCEDURE') {
    taskParams.type = data.type
    taskParams.datasource = data.datasource
    taskParams.method = data.method
  }

  if (data.taskType === 'SEATUNNEL') {
    taskParams.startupScript = data.startupScript
    taskParams.useCustom = data.useCustom
    taskParams.rawScript = data.rawScript
    if (data.startupScript?.includes('flink')) {
      taskParams.runMode = data.runMode
      taskParams.others = data.others
    }
    if (data.startupScript?.includes('spark')) {
      taskParams.deployMode = data.deployMode
      taskParams.master = data.master
      taskParams.masterUrl = data.masterUrl
    }
    if (data.startupScript === 'seatunnel.sh') {
      taskParams.deployMode = data.deployMode
      taskParams.others = data.others
    }
  }

  if (data.taskType === 'SWITCH') {
    taskParams.switchResult = {}
    taskParams.switchResult.dependTaskList = data.dependTaskList
    taskParams.switchResult.nextNode = data.nextNode
  }

  if (data.taskType === 'CONDITIONS') {
    taskParams.dependence = {
      relation: data.relation,
      dependTaskList: data.dependTaskList
    }
    taskParams.conditionResult = {}
    if (data.successBranch) {
      taskParams.conditionResult.successNode = [data.successBranch]
    }
    if (data.failedBranch) {
      taskParams.conditionResult.failedNode = [data.failedBranch]
    }
  }

  if (data.taskType === 'DATAX') {
    taskParams.customConfig = data.customConfig ? 1 : 0
    if (taskParams.customConfig === 0) {
      taskParams.dsType = data.dsType
      taskParams.dataSource = data.dataSource
      taskParams.dtType = data.dtType
      taskParams.dataTarget = data.dataTarget
      taskParams.sql = data.sql
      taskParams.targetTable = data.targetTable
      taskParams.jobSpeedByte = data.jobSpeedByte
      taskParams.jobSpeedRecord = data.jobSpeedRecord
      taskParams.preStatements = data.preStatements
      taskParams.postStatements = data.postStatements
    } else {
      taskParams.json = data.json
      data?.localParams?.map((param: ILocalParam) => {
        param.direct = 'IN'
        param.type = 'VARCHAR'
      })
    }
    taskParams.xms = data.xms
    taskParams.xmx = data.xmx
  }
  if (data.taskType === 'DEPENDENT') {
    taskParams.dependence = {
      checkInterval: data.checkInterval,
      failurePolicy: data.failurePolicy,
      failureWaitingTime: data.failureWaitingTime,
      relation: data.relation,
      dependTaskList: data.dependTaskList
    }
  }
  if (data.taskType === 'DATA_QUALITY') {
    taskParams.ruleId = data.ruleId
    taskParams.ruleInputParameter = {
      check_type: data.check_type,
      comparison_execute_sql: data.comparison_execute_sql,
      comparison_type: data.comparison_type,
      comparison_name: data.comparison_name,
      failure_strategy: data.failure_strategy,
      operator: data.operator,
      src_connector_type: data.src_connector_type,
      src_datasource_id: data.src_datasource_id,
      src_database: data.src_database,
      field_length: data.field_length,
      begin_time: data.begin_time,
      deadline: data.deadline,
      datetime_format: data.datetime_format,
      enum_list: data.enum_list,
      regexp_pattern: data.regexp_pattern,
      target_filter: data.target_filter,
      src_filter: data.src_filter,
      src_field: data.src_field,
      src_table: data.src_table,
      statistics_execute_sql: data.statistics_execute_sql,
      statistics_name: data.statistics_name,
      target_connector_type: data.target_connector_type,
      target_datasource_id: data.target_datasource_id,
      target_database: data.target_database,
      target_table: data.target_table,
      threshold: data.threshold,
      mapping_columns: JSON.stringify(data.mapping_columns)
    }
    taskParams.sparkParameters = {
      deployMode: data.deployMode,
      driverCores: data.driverCores,
      driverMemory: data.driverMemory,
      executorCores: data.executorCores,
      executorMemory: data.executorMemory,
      numExecutors: data.numExecutors,
      others: data.others,
      yarnQueue: data.yarnQueue,
      sqlExecutionType: data.sqlExecutionType
    }
  }

  if (data.taskType === 'EMR') {
    taskParams.type = data.type
    taskParams.programType = data.programType
    taskParams.jobFlowDefineJson = data.jobFlowDefineJson
    taskParams.stepsDefineJson = data.stepsDefineJson
  }

  if (data.taskType === 'ZEPPELIN') {
    taskParams.noteId = data.noteId
    taskParams.paragraphId = data.paragraphId
    taskParams.restEndpoint = data.restEndpoint
    taskParams.username = data.username
    taskParams.password = data.password
    taskParams.productionNoteDirectory = data.productionNoteDirectory
    taskParams.parameters = data.parameters
    taskParams.datasource = data.datasource
    taskParams.type = data.type
  }

  if (data.taskType === 'K8S') {
    taskParams.namespace = data.namespace
    taskParams.minCpuCores = data.minCpuCores
    taskParams.minMemorySpace = data.minMemorySpace
    taskParams.image = data.image
    taskParams.imagePullPolicy = data.imagePullPolicy
    taskParams.command = data.command
    taskParams.args = data.args
    taskParams.customizedLabels = data.customizedLabels
    taskParams.nodeSelectors = data.nodeSelectors
    taskParams.pullSecret = data.pullSecret
  }

  if (data.taskType === 'JUPYTER') {
    taskParams.condaEnvName = data.condaEnvName
    taskParams.inputNotePath = data.inputNotePath
    taskParams.outputNotePath = data.outputNotePath
    taskParams.parameters = data.parameters
    taskParams.kernel = data.kernel
    taskParams.engine = data.engine
    taskParams.executionTimeout = data.executionTimeout
    taskParams.startTimeout = data.startTimeout
    taskParams.others = data.others
  }

  if (data.taskType === 'MLFLOW') {
    taskParams.algorithm = data.algorithm
    taskParams.params = data.params
    taskParams.searchParams = data.searchParams
    taskParams.dataPath = data.dataPath
    taskParams.experimentName = data.experimentName
    taskParams.modelName = data.modelName
    taskParams.mlflowTrackingUri = data.mlflowTrackingUri
    taskParams.mlflowJobType = data.mlflowJobType
    taskParams.automlTool = data.automlTool
    taskParams.registerModel = data.registerModel
    taskParams.mlflowTaskType = data.mlflowTaskType
    taskParams.deployType = data.deployType
    taskParams.deployPort = data.deployPort
    taskParams.deployModelKey = data.deployModelKey
    taskParams.mlflowProjectRepository = data.mlflowProjectRepository
    taskParams.mlflowProjectVersion = data.mlflowProjectVersion
  }

  if (data.taskType === 'DVC') {
    taskParams.dvcTaskType = data.dvcTaskType
    taskParams.dvcRepository = data.dvcRepository
    taskParams.dvcVersion = data.dvcVersion
    taskParams.dvcDataLocation = data.dvcDataLocation
    taskParams.dvcMessage = data.dvcMessage
    taskParams.dvcLoadSaveDataPath = data.dvcLoadSaveDataPath
    taskParams.dvcStoreUrl = data.dvcStoreUrl
  }

  if (data.taskType === 'SAGEMAKER') {
    taskParams.sagemakerRequestJson = data.sagemakerRequestJson
    taskParams.username = data.username
    taskParams.password = data.password
    taskParams.datasource = data.datasource
    taskParams.type = data.type
    taskParams.awsRegion = data.awsRegion
  }
  if (data.taskType === 'PYTORCH') {
    taskParams.script = data.script
    taskParams.scriptParams = data.scriptParams
    taskParams.pythonPath = data.pythonPath
    taskParams.isCreateEnvironment = data.isCreateEnvironment
    taskParams.pythonCommand = data.pythonCommand
    taskParams.pythonEnvTool = data.pythonEnvTool
    taskParams.requirements = data.requirements
    taskParams.condaPythonVersion = data.condaPythonVersion
  }

  if (data.taskType === 'DINKY') {
    taskParams.address = data.address
    taskParams.taskId = data.taskId
    taskParams.online = data.online
  }

  if (data.taskType === 'OPENMLDB') {
    taskParams.zk = data.zk
    taskParams.zkPath = data.zkPath
    taskParams.executeMode = data.executeMode
    taskParams.sql = data.sql
  }

  if (data.taskType === 'CHUNJUN') {
    taskParams.customConfig = data.customConfig ? 1 : 0
    taskParams.json = data.json
    taskParams.deployMode = data.deployMode
    taskParams.others = data.others
  }

  if (data.taskType === 'PIGEON') {
    taskParams.targetJobName = data.targetJobName
  }

  if (data.taskType === 'HIVECLI') {
    taskParams.hiveCliTaskExecutionType = data.hiveCliTaskExecutionType
    taskParams.hiveSqlScript = data.hiveSqlScript
    taskParams.hiveCliOptions = data.hiveCliOptions
  }
  if (data.taskType === 'DMS') {
    taskParams.isRestartTask = data.isRestartTask
    taskParams.isJsonFormat = data.isJsonFormat
    taskParams.jsonData = data.jsonData
    taskParams.migrationType = data.migrationType
    taskParams.replicationTaskIdentifier = data.replicationTaskIdentifier
    taskParams.sourceEndpointArn = data.sourceEndpointArn
    taskParams.targetEndpointArn = data.targetEndpointArn
    taskParams.replicationInstanceArn = data.replicationInstanceArn
    taskParams.tableMappings = data.tableMappings
    taskParams.replicationTaskArn = data.replicationTaskArn
  }

  if (data.taskType === 'DATASYNC') {
    taskParams.jsonFormat = data.jsonFormat
    taskParams.json = data.json
    taskParams.destinationLocationArn = data.destinationLocationArn
    taskParams.sourceLocationArn = data.sourceLocationArn
    taskParams.name = data.name
    taskParams.cloudWatchLogGroupArn = data.cloudWatchLogGroupArn
  }

  if (data.taskType === 'KUBEFLOW') {
    taskParams.yamlContent = data.yamlContent
    taskParams.namespace = data.namespace
  }

  if (data.taskType === 'LINKIS') {
    taskParams.useCustom = data.useCustom
    taskParams.paramScript = data.paramScript
    taskParams.rawScript = data.rawScript
  }

  if (data.taskType === 'DATA_FACTORY') {
    taskParams.factoryName = data.factoryName
    taskParams.resourceGroupName = data.resourceGroupName
    taskParams.pipelineName = data.pipelineName
  }

  if (data.taskType === 'REMOTESHELL') {
    taskParams.type = data.type
    taskParams.datasource = data.datasource
  }

  if (data.taskType === 'DYNAMIC') {
    taskParams.processDefinitionCode = data.processDefinitionCode
    taskParams.maxNumOfSubWorkflowInstances = data.maxNumOfSubWorkflowInstances
    taskParams.degreeOfParallelism = data.degreeOfParallelism
    taskParams.filterCondition = data.filterCondition
    taskParams.listParameters = data.listParameters
  }

  let timeoutNotifyStrategy = ''
  if (data.timeoutNotifyStrategy) {
    if (data.timeoutNotifyStrategy.length === 1) {
      timeoutNotifyStrategy = data.timeoutNotifyStrategy[0]
    }
    if (data.timeoutNotifyStrategy.length === 2) {
      timeoutNotifyStrategy = 'WARNFAILED'
    }
  }
  const params = {
    processDefinitionCode: data.processName ? String(data.processName) : '',
    upstreamCodes: data?.preTasks?.join(','),
    taskDefinitionJsonObj: {
      code: data.code,
      delayTime: data.delayTime ? String(data.delayTime) : '0',
      description: data.description,
      environmentCode: data.environmentCode || -1,
      failRetryInterval: data.failRetryInterval
        ? String(data.failRetryInterval)
        : '0',
      failRetryTimes: data.failRetryTimes ? String(data.failRetryTimes) : '0',
      flag: data.flag,
      isCache: data.isCache ? 'YES' : 'NO',
      name: data.name,
      taskGroupId: data.taskGroupId,
      taskGroupPriority: data.taskGroupPriority,
      taskParams: {
        localParams: data.localParams?.map((item: any) => {
          item.value = item.value || ''
          return item
        }),
        initScript: data.initScript,
        rawScript: data.rawScript,
        resourceList: data.resourceList?.length
          ? data.resourceList.map((fullName: string) => ({
              resourceName: `${fullName}`
            }))
          : [],
        ...taskParams
      },
      taskPriority: data.taskPriority,
      taskType: data.taskType,
      timeout: data.timeoutFlag ? data.timeout : 0,
      timeoutFlag: data.timeoutFlag ? 'OPEN' : 'CLOSE',
      timeoutNotifyStrategy: data.timeoutFlag ? timeoutNotifyStrategy : '',
      workerGroup: data.workerGroup,
      cpuQuota: data.cpuQuota || -1,
      memoryMax: data.memoryMax || -1,
      taskExecuteType: data.taskExecuteType
    }
  } as {
    processDefinitionCode: string
    upstreamCodes: string
    taskDefinitionJsonObj: { timeout: number; timeoutNotifyStrategy: string }
  }
  if (!data.timeoutFlag) {
    params.taskDefinitionJsonObj.timeout = 0
    params.taskDefinitionJsonObj.timeoutNotifyStrategy = ''
  }
  return params
}

export function formatModel(data: ITaskData) {
  const params = {
    ...omit(data, [
      'environmentCode',
      'timeoutFlag',
      'timeoutNotifyStrategy',
      'taskParams'
    ]),
    ...omit(data.taskParams, ['resourceList', 'mainJar', 'localParams']),
    environmentCode: data.environmentCode === -1 ? null : data.environmentCode,
    timeoutFlag: data.timeoutFlag === 'OPEN',
    isCache: data.isCache === 'YES',
    timeoutNotifyStrategy: data.timeoutNotifyStrategy
      ? [data.timeoutNotifyStrategy]
      : [],
    localParams: data.taskParams?.localParams || []
  } as INodeData

  if (data.timeoutNotifyStrategy === 'WARNFAILED') {
    params.timeoutNotifyStrategy = ['WARN', 'FAILED']
  }
  if (data.taskParams?.resourceList) {
    params.resourceList = data.taskParams.resourceList.map(
      (item: { resourceName: string }) => `${item.resourceName}`
    )
  }
  if (data.taskParams?.mainJar) {
    params.mainJar = data.taskParams?.mainJar.resourceName
  }

  if (data.taskParams?.method) {
    params.method = data.taskParams?.method
  }

  if (data.taskParams?.targetParams) {
    const targetParams: ISqoopTargetParams = JSON.parse(
      data.taskParams.targetParams
    )
    params.targetType = data.taskParams.targetType
    params.targetHiveDatabase = targetParams.hiveDatabase
    params.targetHiveTable = targetParams.hiveTable
    params.targetHiveCreateTable = targetParams.createHiveTable
    params.targetHiveDropDelimiter = targetParams.dropDelimiter
    params.targetHiveOverWrite =
      targetParams.hiveOverWrite === void 0 ? true : targetParams.hiveOverWrite
    params.targetHiveTargetDir = targetParams.hiveTargetDir
    params.targetHiveReplaceDelimiter = targetParams.replaceDelimiter
    params.targetHivePartitionKey = targetParams.hivePartitionKey
    params.targetHivePartitionValue = targetParams.hivePartitionValue
    params.targetHdfsTargetPath = targetParams.targetPath
    params.targetHdfsDeleteTargetDir =
      targetParams.deleteTargetDir === void 0
        ? true
        : targetParams.deleteTargetDir
    params.targetHdfsCompressionCodec =
      targetParams.compressionCodec === void 0
        ? 'snappy'
        : targetParams.compressionCodec
    params.targetHdfsFileType =
      targetParams.fileType === void 0
        ? '--as-avrodatafile'
        : targetParams.fileType
    params.targetHdfsFieldsTerminated = targetParams.fieldsTerminated
    params.targetHdfsLinesTerminated = targetParams.linesTerminated
    params.targetMysqlType = targetParams.targetType
    params.targetMysqlDatasource = targetParams.targetDatasource
    params.targetMysqlTable = targetParams.targetTable
    params.targetMysqlColumns = targetParams.targetColumns
    params.targetMysqlFieldsTerminated = targetParams.fieldsTerminated
    params.targetMysqlLinesTerminated = targetParams.linesTerminated
    params.targetMysqlIsUpdate = targetParams.isUpdate
    params.targetMysqlTargetUpdateKey = targetParams.targetUpdateKey
    params.targetMysqlUpdateMode =
      targetParams.targetUpdateMode === void 0
        ? 'allowinsert'
        : targetParams.targetUpdateMode
  }
  if (data.taskParams?.sourceParams) {
    const sourceParams: ISqoopSourceParams = JSON.parse(
      data.taskParams.sourceParams
    )
    params.srcTable = sourceParams.srcTable
    params.srcColumnType = sourceParams.srcColumnType
    params.srcColumns = sourceParams.srcColumns
    params.sourceMysqlSrcQuerySql = sourceParams.srcQuerySql
    params.srcQueryType = sourceParams.srcQueryType
    params.sourceMysqlType = sourceParams.srcType
    params.sourceMysqlDatasource = sourceParams.srcDatasource
    params.mapColumnHive = sourceParams.mapColumnHive || []
    params.mapColumnJava = sourceParams.mapColumnJava || []
    params.sourceHdfsExportDir = sourceParams.exportDir
    params.sourceHiveDatabase = sourceParams.hiveDatabase
    params.sourceHiveTable = sourceParams.hiveTable
    params.sourceHivePartitionKey = sourceParams.hivePartitionKey
    params.sourceHivePartitionValue = sourceParams.hivePartitionValue
  }

  if (data.taskParams?.rawScript) {
    params.rawScript = data.taskParams?.rawScript
  }

  if (data.taskParams?.initScript) {
    params.initScript = data.taskParams?.initScript
  }

  if (data.taskParams?.switchResult) {
    params.switchResult = data.taskParams.switchResult
    params.dependTaskList = data.taskParams.switchResult?.dependTaskList
      ? data.taskParams.switchResult?.dependTaskList
      : []
    params.nextNode = data.taskParams.switchResult?.nextNode
  }

  if (data.taskParams?.dependence) {
    const dependence: IDependentParameters = JSON.parse(
      JSON.stringify(data.taskParams.dependence)
    )
    params.checkInterval = dependence.checkInterval
    params.failurePolicy = dependence.failurePolicy
    params.failureWaitingTime = dependence.failureWaitingTime
    params.dependTaskList = dependence.dependTaskList || []
    params.relation = dependence.relation
  }

  if (data.taskParams?.ruleInputParameter) {
    params.check_type = data.taskParams.ruleInputParameter.check_type
    params.comparison_execute_sql =
      data.taskParams.ruleInputParameter.comparison_execute_sql
    params.comparison_type = data.taskParams.ruleInputParameter.comparison_type
    params.comparison_name = data.taskParams.ruleInputParameter.comparison_name
    params.failure_strategy =
      data.taskParams.ruleInputParameter.failure_strategy
    params.operator = data.taskParams.ruleInputParameter.operator
    params.src_connector_type =
      data.taskParams.ruleInputParameter.src_connector_type
    params.src_datasource_id =
      data.taskParams.ruleInputParameter.src_datasource_id
    params.src_database = data.taskParams.ruleInputParameter.src_database
    params.src_table = data.taskParams.ruleInputParameter.src_table
    params.field_length = data.taskParams.ruleInputParameter.field_length
    params.begin_time = data.taskParams.ruleInputParameter.begin_time
    params.deadline = data.taskParams.ruleInputParameter.deadline
    params.datetime_format = data.taskParams.ruleInputParameter.datetime_format
    params.target_filter = data.taskParams.ruleInputParameter.target_filter
    params.regexp_pattern = data.taskParams.ruleInputParameter.regexp_pattern
    params.enum_list = data.taskParams.ruleInputParameter.enum_list
    params.src_filter = data.taskParams.ruleInputParameter.src_filter
    params.src_field = data.taskParams.ruleInputParameter.src_field
    params.statistics_execute_sql =
      data.taskParams.ruleInputParameter.statistics_execute_sql
    params.statistics_name = data.taskParams.ruleInputParameter.statistics_name
    params.target_connector_type =
      data.taskParams.ruleInputParameter.target_connector_type
    params.target_datasource_id =
      data.taskParams.ruleInputParameter.target_datasource_id
    params.target_database = data.taskParams.ruleInputParameter.target_database
    params.target_table = data.taskParams.ruleInputParameter.target_table
    params.threshold = data.taskParams.ruleInputParameter.threshold
    if (data.taskParams.ruleInputParameter.mapping_columns)
      params.mapping_columns = JSON.parse(
        data.taskParams.ruleInputParameter.mapping_columns
      )
  }
  if (data.taskParams?.sparkParameters) {
    params.deployMode = data.taskParams.sparkParameters.deployMode
    params.driverCores = data.taskParams.sparkParameters.driverCores
    params.driverMemory = data.taskParams.sparkParameters.driverMemory
    params.executorCores = data.taskParams.sparkParameters.executorCores
    params.executorMemory = data.taskParams.sparkParameters.executorMemory
    params.numExecutors = data.taskParams.sparkParameters.numExecutors
    params.others = data.taskParams.sparkParameters.others
    params.sqlExecutionType = data.taskParams.sparkParameters.sqlExecutionType
  }

  if (data.taskParams?.conditionResult?.successNode?.length) {
    params.successBranch = data.taskParams.conditionResult.successNode[0]
  }
  if (data.taskParams?.conditionResult?.failedNode?.length) {
    params.failedBranch = data.taskParams.conditionResult.failedNode[0]
  }
  if (data.taskParams?.udfs) {
    params.udfs = data.taskParams.udfs?.split(',')
  }
  if (data.taskParams?.customConfig !== void 0) {
    params.customConfig = data.taskParams.customConfig === 1 ? true : false
  }
  if (data.taskParams?.jobType) {
    params.isCustomTask = data.taskParams.jobType === 'CUSTOM'
  }

  return params
}

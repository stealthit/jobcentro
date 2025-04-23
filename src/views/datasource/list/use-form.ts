import { reactive, ref } from 'vue'
import { getKerberosStartupState } from '@/service/modules/data-source'
import type { FormRules } from 'naive-ui'
import type {
  IDataSourceDetail,
  IDataBase,
  IDataBaseOption,
  IDataBaseOptionKeys,
  IDataSource
} from './types'
import utils from '@/utils'

export function useForm(id?: number) {
  const initialValues = {
    type: 'MYSQL',
    label: 'MYSQL',
    name: '',
    note: '',
    host: '',
    port: datasourceType['MYSQL'].defaultPort,
    principal: '',
    javaSecurityKrb5Conf: '',
    loginUserKeytabUsername: '',
    loginUserKeytabPath: '',
    mode: '',
    userName: '',
    password: '',
    database: '',
    connectType: '',
    other: '',
    endpoint: '',
    MSIClientId: '',
    dbUser: '',
    datawarehouse: ''
  } as IDataSourceDetail

  const state = reactive({
    detailFormRef: ref(),
    detailForm: { ...initialValues },
    requiredDataBase: true,
    showHost: true,
    showPort: true,
    showAwsRegion: false,
    showRestEndpoint: false,
    showCompatibleMode: false,
    showConnectType: false,
    showPrincipal: false,
    showMode: false,
    showDataBaseName: true,
    showJDBCConnectParameters: true,
    showPublicKey: false,
    rules: {
      name: {
        trigger: ['input'],
        validator() {
          if (!state.detailForm.name) {
            return new Error('Please enter datasource name')
          }
        }
      },
      host: {
        trigger: ['input'],
        validator() {
          if (!state.detailForm.host && state.showHost) {
            return new Error('Please enter IP')
          }
        }
      },
      port: {
        trigger: ['input'],
        validator() {
          if (state.showMode && state.detailForm.mode === 'IAM-accessKey') {
            return
          }
          if (!state.detailForm.port && state.showPort) {
            return new Error('Please enter port')
          }
        }
      },
      principal: {
        trigger: ['input'],
        validator() {
          if (!state.detailForm.principal && state.showPrincipal) {
            return new Error('Please enter Principal')
          }
        }
      },
      mode: {
        trigger: ['blur'],
        validator() {
          if (!state.detailForm.mode && state.showMode) {
            return new Error('Please select a mode')
          }
        }
      },
      userName: {
        trigger: ['input'],
        validator() {
          if (
            !state.detailForm.userName &&
            state.detailForm.type !== 'AZURESQL'
          ) {
            return new Error('Please enter your username')
          }
        }
      },
      awsRegion: {
        trigger: ['input'],
        validator() {
          if (!state.detailForm.awsRegion && state.showAwsRegion) {
            return new Error('Please enter AwsRegion')
          }
        }
      },
      database: {
        trigger: ['input'],
        validator() {
          if (!state.detailForm.database && state.requiredDataBase) {
            return new Error('Please enter database name')
          }
        }
      },
      datawarehouse: {
        trigger: ['input'],
        validator() {
          if (!state.detailForm.datawarehouse) {
            return new Error('Please enter datawarehouse')
          }
        }
      },
      connectType: {
        trigger: ['update'],
        validator() {
          if (!state.detailForm.connectType && state.showConnectType) {
            return new Error('Please select serviceName or SID')
          }
        }
      },
      other: {
        trigger: ['input', 'blur'],
        validator() {
          if (state.detailForm.other && !utils.isJson(state.detailForm.other)) {
            return new Error('jdbc connection parameters is not a correct JSON format')
          }
        }
      },
      endpoint: {
        trigger: ['input'],
        validator() {
          if (
            !state.detailForm.endpoint &&
            state.detailForm.type === 'AZURESQL' &&
            state.detailForm.mode === 'accessToken'
          ) {
            return new Error('Please enter OAuth Token')
          }
        }
      },
      dbUser: {
        trigger: ['input'],
        validator() {
          if (
            !state.detailForm.dbUser &&
            state.showMode &&
            state.detailForm.mode === 'IAM-accessKey' &&
            state.detailForm.type != 'SAGEMAKER'
          ) {
            return new Error('Check your IAM-accessKey')
          }
        }
      }
    } as FormRules,
    modeOptions: [
      {
        label: 'SqlPassword',
        value: 'SqlPassword'
      },
      {
        label: 'ActiveDirectoryPassword',
        value: 'ActiveDirectoryPassword'
      },
      {
        label: 'ActiveDirectoryMSI',
        value: 'ActiveDirectoryMSI'
      },
      {
        label: 'ActiveDirectoryServicePrincipal',
        value: 'ActiveDirectoryServicePrincipal'
      },
      {
        label: 'accessToken',
        value: 'accessToken'
      }
    ],
    redShiftModeOptions: [
      {
        label: 'password',
        value: 'password'
      },
      {
        label: 'IAM-accessKey',
        value: 'IAM-accessKey'
      }
    ],
    sagemakerModeOption: [
      {
        label: 'IAM-accessKey',
        value: 'IAM-accessKey'
      }
    ]
  })

  const changeType = async (type: IDataBase, options: IDataBaseOption) => {
    state.detailForm.port = options.previousPort || options.defaultPort
    state.detailForm.type = type

    state.requiredDataBase = type !== 'POSTGRESQL' && type !== 'ATHENA'

    state.showHost = type !== 'ATHENA'
    state.showPort = type !== 'ATHENA'
    state.showAwsRegion = type === 'ATHENA' || type === 'SAGEMAKER'
    state.showMode = ['AZURESQL', 'REDSHIFT', 'SAGEMAKER'].includes(type)

    if (type === 'ORACLE' && !id) {
      state.detailForm.connectType = 'ORACLE_SERVICE_NAME'
    }
    state.showConnectType = type === 'ORACLE'

    state.showCompatibleMode = type == 'OCEANBASE'

    if (type === 'HIVE' || type === 'SPARK') {
      state.showPrincipal = await getKerberosStartupState()
    } else {
      state.showPrincipal = false
    }
    if (type === 'SSH' || type === 'ZEPPELIN' || type === 'SAGEMAKER') {
      state.showDataBaseName = false
      state.requiredDataBase = false
      state.showJDBCConnectParameters = false
      state.showPublicKey = false
      if (type === 'SSH') {
        state.showPublicKey = true
      }
      if (type === 'ZEPPELIN') {
        state.showHost = false
        state.showPort = false
        state.showRestEndpoint = true
      }
      if (type === 'SAGEMAKER') {
        state.showHost = false
        state.showPort = false
      }
    } else {
      state.showDataBaseName = true
      state.requiredDataBase = true
      state.showJDBCConnectParameters = true
      state.showPublicKey = false
    }
  }

  const changePort = async () => {
    if (!state.detailForm.type) return
    const currentDataBaseOption = datasourceType[state.detailForm.type]
    currentDataBaseOption.previousPort = state.detailForm.port
  }

  const resetFieldsValue = () => {
    state.detailForm = { ...initialValues }
  }

  const setFieldsValue = (values: IDataSource) => {
    state.detailForm = {
      ...state.detailForm,
      ...values,
      other: values.other ? JSON.stringify(values.other) : values.other
    }
  }

  const getFieldsValue = () => state.detailForm

  return {
    state,
    changeType,
    changePort,
    resetFieldsValue,
    setFieldsValue,
    getFieldsValue
  }
}

export const datasourceType: IDataBaseOptionKeys = {
  MYSQL: {
    value: 'MYSQL',
    label: 'MYSQL',
    defaultPort: 3306
  },
  POSTGRESQL: {
    value: 'POSTGRESQL',
    label: 'POSTGRESQL',
    defaultPort: 5432
  },
  HIVE: {
    value: 'HIVE',
    label: 'HIVE/IMPALA',
    defaultPort: 10000
  },
  KYUUBI: {
    value: 'KYUUBI',
    label: 'KYUUBI',
    defaultPort: 10000
  },
  SPARK: {
    value: 'SPARK',
    label: 'SPARK',
    defaultPort: 10015
  },
  CLICKHOUSE: {
    value: 'CLICKHOUSE',
    label: 'CLICKHOUSE',
    defaultPort: 8123
  },
  ORACLE: {
    value: 'ORACLE',
    label: 'ORACLE',
    defaultPort: 1521
  },
  SQLSERVER: {
    value: 'SQLSERVER',
    label: 'SQLSERVER',
    defaultPort: 1433
  },
  DB2: {
    value: 'DB2',
    label: 'DB2',
    defaultPort: 50000
  },
  VERTICA: {
    value: 'VERTICA',
    label: 'VERTICA',
    defaultPort: 5433
  },
  PRESTO: {
    value: 'PRESTO',
    label: 'PRESTO',
    defaultPort: 8080
  },
  REDSHIFT: {
    value: 'REDSHIFT',
    label: 'REDSHIFT',
    defaultPort: 5439
  },
  ATHENA: {
    value: 'ATHENA',
    label: 'ATHENA',
    defaultPort: 0
  },
  TRINO: {
    value: 'TRINO',
    label: 'TRINO',
    defaultPort: 8080
  },
  AZURESQL: {
    value: 'AZURESQL',
    label: 'AZURESQL',
    defaultPort: 1433
  },
  STARROCKS: {
    value: 'STARROCKS',
    label: 'STARROCKS',
    defaultPort: 9030
  },
  DAMENG: {
    value: 'DAMENG',
    label: 'DAMENG',
    defaultPort: 5236
  },
  OCEANBASE: {
    value: 'OCEANBASE',
    label: 'OCEANBASE',
    defaultPort: 2881
  },
  SNOWFLAKE: {
    value: 'SNOWFLAKE',
    label: 'SNOWFLAKE',
    defaultPort: 3306
  },
  SSH: {
    value: 'SSH',
    label: 'SSH',
    defaultPort: 22
  },
  DATABEND: {
    value: 'DATABEND',
    label: 'DATABEND',
    defaultPort: 8000
  },
  HANA: {
    value: 'HANA',
    label: 'HANA',
    defaultPort: 30015
  },
  ZEPPELIN: {
    value: 'ZEPPELIN',
    label: 'ZEPPELIN',
    defaultPort: 8080
  },
  DORIS: {
    value: 'DORIS',
    label: 'DORIS',
    defaultPort: 9030
  },
  SAGEMAKER: {
    value: 'SAGEMAKER',
    label: 'SAGEMAKER',
    defaultPort: 0
  }
}

export const datasourceTypeList: IDataBaseOption[] = Object.values(
  datasourceType
).map((item) => {
  item.class = 'options-datasource-type'
  return item
})

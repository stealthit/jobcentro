import {
  defineComponent,
  getCurrentInstance,
  PropType,
  toRefs,
  watch
} from 'vue'
import {
  NButton,
  NSpin,
  NForm,
  NFormItem,
  NSelect,
  NInput,
  NInputNumber,
  NRadioGroup,
  NRadio,
  NSpace
} from 'naive-ui'
import Modal from '@/components/modal'
import { useForm, datasourceType } from './use-form'
import { useDetail } from './use-detail'
import styles from './index.module.scss'

const props = {
  show: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  id: {
    type: Number as PropType<number>
  },
  selectType: {
    type: String as PropType<any>,
    default: 'MYSQL'
  }
}

const DetailModal = defineComponent({
  name: 'DetailModal',
  props,
  emits: ['cancel', 'update', 'open'],
  setup(props, ctx) {
    const {
      state,
      changeType,
      changePort,
      resetFieldsValue,
      setFieldsValue,
      getFieldsValue
    } = useForm(props.id)

    const { status, queryById, testConnect, createOrUpdate } =
      useDetail(getFieldsValue)

    const onCancel = () => {
      resetFieldsValue()
      ctx.emit('cancel')
    }

    const onSubmit = async () => {
      await state.detailFormRef.validate()
      const res = await createOrUpdate(props.id)
      if (res) {
        onCancel()
        ctx.emit('update')
      }
    }

    const onTest = async () => {
      await state.detailFormRef.validate()
      testConnect()
    }

    const onChangeType = changeType
    const onChangePort = changePort

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    const handleSourceModalOpen = () => {
      ctx.emit('open')
    }

    watch(
      () => props.show,
      async () => {
        state.detailForm.type = props.selectType
        state.detailForm.label =
          props.selectType === 'HIVE' ? 'HIVE/IMPALA' : props.selectType
        props.show &&
          state.detailForm.type &&
          (await changeType(
            state.detailForm.type,
            datasourceType[state.detailForm.type]
          ))
        props.show && props.id && setFieldsValue(await queryById(props.id))
      }
    )

    watch(
      () => props.selectType,
      async () => {
        state.detailForm.type = props.selectType
        state.detailForm.label =
          props.selectType === 'HIVE' ? 'HIVE/IMPALA' : props.selectType
        state.detailForm.type &&
          (await changeType(
            state.detailForm.type,
            datasourceType[state.detailForm.type]
          ))
      }
    )

    return {
      ...toRefs(state),
      ...toRefs(status),
      onChangeType,
      onChangePort,
      onSubmit,
      onTest,
      onCancel,
      trim,
      handleSourceModalOpen
    }
  },
  render() {
    const {
      show,
      id,
      detailForm,
      rules,
      requiredDataBase,
      showHost,
      showPort,
      showRestEndpoint,
      showAwsRegion,
      showCompatibleMode,
      showConnectType,
      showPrincipal,
      showMode,
      showDataBaseName,
      showJDBCConnectParameters,
      showPublicKey,
      modeOptions,
      redShiftModeOptions,
      sagemakerModeOption,
      loading,
      saving,
      testing,
      onChangePort,
      onCancel,
      onTest,
      onSubmit,
      handleSourceModalOpen
    } = this
    return (
      <Modal
        class='dialog-create-data-source'
        show={show}
        title={`${id ? 'datasource.edit' : 'datasource.create'}${'DataSource'}`}
        onConfirm={onSubmit}
        confirmLoading={saving || loading}
        onCancel={onCancel}
        confirmClassName='btn-submit'
        cancelClassName='btn-cancel'
      >
        {{
          default: () => (
            <NSpin show={loading}>
              <NForm
                rules={rules}
                ref='detailFormRef'
                require-mark-placement='left'
                label-align='left'
              >
                <NFormItem
                  label='데이터 소스'
                  path='type'
                  show-require-mark
                >
                  <div class={[styles.typeBox, !!id && styles.disabledBox]}>
                    <div v-model={[detailForm.type, 'value']}>
                      {detailForm.label}
                    </div>
                    <div
                      class={[
                        styles['text-color'],
                        'btn-data-source-type-drop-down'
                      ]}
                      onClick={handleSourceModalOpen}
                    >
                      {'Select'}
                    </div>
                  </div>
                </NFormItem>
                <NFormItem
                  label='데이터 소스명'
                  path='name'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    class='input-data-source-name'
                    v-model={[detailForm.name, 'value']}
                    maxlength={60}
                    placeholder='Please enter datasource name'
                  />
                </NFormItem>
                <NFormItem label='Description' path='note'>
                  <NInput
                    class='input-data-source-description'
                    v-model={[detailForm.note, 'value']}
                    type='textarea'
                    placeholder='Please enter description'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showHost}
                  label='IP'
                  path='host'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    class='input-ip'
                    v-model={[detailForm.host, 'value']}
                    type='text'
                    maxlength={255}
                    placeholder='Please enter IP'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showRestEndpoint}
                  label='zeppelinRestEndpoint'
                  path='restEndPoint'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    class='input-zeppelin_rest_endpoint'
                    v-model={[detailForm.restEndpoint, 'value']}
                    type='text'
                    maxlength={255}
                    placeholder='Please input zeppelin restEndpoint'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showPort}
                  label='Port'
                  path='port'
                  show-require-mark={
                    !(showMode && detailForm.mode === 'IAM-accessKey')
                  }
                >
                  <NInputNumber
                    class='input-port'
                    v-model={[detailForm.port, 'value']}
                    show-button={false}
                    placeholder='Please enter port'
                    on-blur={onChangePort}
                    style={{ width: '100%' }}
                  />
                </NFormItem>
                <NFormItem
                  v-show={showPrincipal}
                  label='Principal'
                  path='principal'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.principal, 'value']}
                    type='text'
                    placeholder='Please enter Principal'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showPrincipal}
                  label='krb5.conf'
                  path='javaSecurityKrb5Conf'
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.javaSecurityKrb5Conf, 'value']}
                    type='text'
                    placeholder='Please enter the kerberos authentication parameter java.security.krb5.conf'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showMode}
                  label='Validation'
                  path='mode'
                  show-require-mark
                >
                  <NSelect
                    v-model={[detailForm.mode, 'value']}
                    options={
                      detailForm.type === 'REDSHIFT'
                        ? redShiftModeOptions
                        : detailForm.type === 'SAGEMAKER'
                        ? sagemakerModeOption
                        : modeOptions
                    }
                  ></NSelect>
                </NFormItem>
                {/* SqlPassword */}
                <NFormItem
                  v-show={showMode && detailForm.mode === 'SqlPassword'}
                  label='Database Username'
                  path='userName'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.userName, 'value']}
                    type='text'
                    placeholder='Database Username'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showMode && detailForm.mode === 'SqlPassword'}
                  label='Database Password'
                  path='password'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.password, 'value']}
                    type='password'
                    placeholder='Database Password'
                  />
                </NFormItem>
                {/* ActiveDirectoryPassword */}
                <NFormItem
                  v-show={
                    showMode && detailForm.mode === 'ActiveDirectoryPassword'
                  }
                  label='Azure AD username'
                  path='userName'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.userName, 'value']}
                    type='text'
                    placeholder='Azure AD username'
                  />
                </NFormItem>
                <NFormItem
                  v-show={
                    showMode && detailForm.mode === 'ActiveDirectoryPassword'
                  }
                  label='Azure AD password'
                  path='password'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.password, 'value']}
                    type='password'
                    placeholder='Azure AD password'
                  />
                </NFormItem>
                {/* ActiveDirectoryMSI */}
                <NFormItem
                  v-show={showMode && detailForm.mode === 'ActiveDirectoryMSI'}
                  label='MSI ClientId'
                  path='MSIClientId'
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.MSIClientId, 'value']}
                    type='password'
                    placeholder='MSI ClientId'
                  />
                </NFormItem>
                {/* ActiveDirectoryServicePrincipal */}
                <NFormItem
                  v-show={
                    showMode &&
                    detailForm.mode === 'ActiveDirectoryServicePrincipal'
                  }
                  label='ClientId'
                  path='userName'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.userName, 'value']}
                    type='text'
                    placeholder='ClientId'
                  />
                </NFormItem>
                <NFormItem
                  v-show={
                    showMode &&
                    detailForm.mode === 'ActiveDirectoryServicePrincipal'
                  }
                  label='ClientSecret'
                  path='password'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.password, 'value']}
                    type='password'
                    placeholder='ClientSecret'
                  />
                </NFormItem>
                {/* accessToken */}
                <NFormItem
                  v-show={showMode && detailForm.mode === 'accessToken'}
                  label='ClientId'
                  path='userName'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.userName, 'value']}
                    type='text'
                    placeholder='ClientId'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showMode && detailForm.mode === 'accessToken'}
                  label='ClientSecret'
                  path='password'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.password, 'value']}
                    type='password'
                    placeholder='ClientSecret'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showMode && detailForm.mode === 'accessToken'}
                  label='OAuth 2.0 token endpoint'
                  path='endpoint'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.endpoint, 'value']}
                    type='text'
                    placeholder='OAuth 2.0 token endpoint'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showMode && detailForm.mode === 'IAM-accessKey'}
                  label='AccessKeyID'
                  path='userName'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.userName, 'value']}
                    type='text'
                    maxlength={60}
                    placeholder='AccessKeyID'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showMode && detailForm.mode === 'IAM-accessKey'}
                  label='SecretAccessKey'
                  path='password'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.password, 'value']}
                    type='password'
                    placeholder='Please input SecretAccessKey'
                  />
                </NFormItem>
                <NFormItem
                  v-show={
                    showMode &&
                    detailForm.mode === 'IAM-accessKey' &&
                    detailForm.type != 'SAGEMAKER'
                  }
                  label='DbUser'
                  path='dbUser'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    class='input-dbUser'
                    v-model={[detailForm.dbUser, 'value']}
                    type='text'
                    placeholder='Please input DbUser'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showPrincipal}
                  label='keytab.username'
                  path='loginUserKeytabUsername'
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.loginUserKeytabUsername, 'value']}
                    type='text'
                    placeholder='Please enter the kerberos authentication parameter login.user.keytab.username'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showPrincipal}
                  label='keytab.path'
                  path='loginUserKeytabPath'
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.loginUserKeytabPath, 'value']}
                    type='text'
                    placeholder='Please enter the kerberos authentication parameter login.user.keytab.path'
                  />
                </NFormItem>
                <NFormItem
                  label='User Name'
                  path='userName'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    class='input-username'
                    v-model={[detailForm.userName, 'value']}
                    type='text'
                    maxlength={60}
                    placeholder='Please enter your username'
                  />
                </NFormItem>
                <NFormItem
                  label='Password'
                  path='password'
                >
                  <NInput
                    allowInput={this.trim}
                    class='input-password'
                    v-model={[detailForm.password, 'value']}
                    type='password'
                    placeholder='Please enter your password'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showAwsRegion}
                  label='Aws Region'
                  path='awsRegion'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    v-model={[detailForm.awsRegion, 'value']}
                    type='text'
                    maxlength={60}
                    placeholder='Please enter AwsRegion'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showDataBaseName}
                  label='Database Name'
                  path='database'
                  show-require-mark={requiredDataBase}
                >
                  <NInput
                    allowInput={this.trim}
                    class='input-data-base'
                    v-model={[detailForm.database, 'value']}
                    type='text'
                    maxlength={60}
                    placeholder='Please enter database name'
                  />
                </NFormItem>
                {detailForm.type === 'SNOWFLAKE' && (
                  <NFormItem
                    label='Datawarehouse'
                    path='datawarehouse'
                    show-require-mark
                  >
                    <NInput
                      allowInput={this.trim}
                      class='input-datawarehouse'
                      v-model={[detailForm.datawarehouse, 'value']}
                      maxlength={60}
                      placeholder='Please enter datawarehouse'
                    />
                  </NFormItem>
                )}
                <NFormItem
                  v-show={showConnectType}
                  label='ServiceName or SID'
                  path='connectType'
                  show-require-mark
                >
                  <NRadioGroup v-model={[detailForm.connectType, 'value']}>
                    <NSpace>
                      <NRadio value='ORACLE_SERVICE_NAME'>
                        {'ServiceName'}
                      </NRadio>
                      <NRadio value='ORACLE_SID'>
                        {'SID'}
                      </NRadio>
                    </NSpace>
                  </NRadioGroup>
                </NFormItem>
                <NFormItem
                  v-show={showCompatibleMode}
                  label='Compatible Mode'
                  path='compatibleMode'
                  show-require-mark
                >
                  <NInput
                    allowInput={this.trim}
                    class='input-data-base'
                    v-model={[detailForm.compatibleMode, 'value']}
                    type='text'
                    maxlength={60}
                    placeholder='Please enter compatible mode'
                  />
                </NFormItem>
                <NFormItem
                  v-show={showJDBCConnectParameters}
                  label='jdbc connect parameters'
                  path='other'
                >
                  <NInput
                    allowInput={this.trim}
                    class='input-jdbc-params'
                    v-model={[detailForm.other, 'value']}
                    type='textarea'
                    autosize={{
                      minRows: 2
                    }}
                    placeholder={`${'Please enter format'} {"key1":"value1","key2":"value2"...} ${'connection parameter'}`}
                  />
                </NFormItem>
                <NFormItem
                  v-show={showPublicKey}
                  label='PublicKey'
                  path='publicKey'
                >
                  <NInput
                    v-model={[detailForm.publicKey, 'value']}
                    type='textarea'
                    autosize={{
                      minRows: 4
                    }}
                  />
                </NFormItem>
              </NForm>
            </NSpin>
          ),
          'btn-middle': () => (
            <NButton
              class='btn-test-connection'
              type='primary'
              size='small'
              onClick={onTest}
              loading={testing || loading}
            >
              {'Test Connect'}
            </NButton>
          )
        }}
      </Modal>
    )
  }
})

export default DetailModal

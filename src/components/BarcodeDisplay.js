const BarcodeDisplay = ({
  cameraWidth,
  barcode,
  halted = false
}) => {
  const color = !halted ? 'rgba(255, 255, 255, 0.5)' : 'black'
  const bodyHeight = halted ? 0.6 * cameraWidth : cameraWidth

  return (
    <View
      style={{
        height: bodyHeight + Constants.statusBarHeight,
        width: cameraWidth,
        backgroundColor: halted ? '#f0f0f0' : undefined
      }}
    >
      <View
        style={{
          height: Constants.statusBarHeight,
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}
      />

      <View
        style={{
          height: bodyHeight,
          width: cameraWidth,

          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            height: 0.4 * cameraWidth,
            width: 0.65 * cameraWidth,

            borderColor: color,
            borderWidth: 2,
            borderRadius: 5,

            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          {barcode && (
            <Text
              style={{
                color: color,
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 10
              }}
            >{barcode}
            </Text>
          )}
        </View>
      </View>
    </View>
  )
}

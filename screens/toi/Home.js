import React from 'react'
import { Dimensions, TouchableOpacity, SafeAreaView, View, Image, Text, ScrollView, PickerIOSComponent }  from 'react-native'
import HomeItem from '../../components/HomeItem'

class HomeScreen extends React.Component {

  render() {

    const homeItems = [
      {
        title: "Pengajuan CV"
      },
      {
        title: "Menerima CV"
      },
      {
        title: "Kelas Pra Nikah "
      },
      {
        title: "Video Eksklusif"
      }
    ]

    return (
      <SafeAreaView
        style = {{
          backgroundColor: 'pink',
          flex : 1
        }}
      >

        <ScrollView
          style = {{
            backgroundColor : 'white',
            flex : 1
          }}
        >
          <View
            style = {{
              backgroundColor : 'pink',
              flexDirection : 'row',
              justifyContent : 'space-between',
              paddingHorizontal : 20,
              paddingBottom : 50,
              paddingTop : 10
            }}
          >

            <TouchableOpacity
              activeOpacity = {0.6}
            >
              <Image
                style = {{
                  height : 40,
                  width : 40,
                  backgroundColor : 'white',
                }}
              />
            </TouchableOpacity>

            <View
              style = {{
                flexDirection : 'row',
                alignItems : 'center'
              }}
            >
              <Text
                style = {{
                  color : 'white',
                  fontWeight : 'bold',
                  fontSize : 24,
                  marginRight : 16
                }}
              >
                Beranda
              </Text>

              <TouchableOpacity
                activeOpacity = {0.6}
              >
                <Image
                  style = {{
                    height : 40,
                    width : 40,
                    backgroundColor : 'white',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style = {{
              backgroundColor : 'white',
              height : 260,
              marginTop : -30,
              marginHorizontal: 20,
              marginBottom : 20,
              borderRadius : 8,
              padding : 16,
              shadowColor : 'black',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 5,
            }}
          >
            <Image
              style = {{
                backgroundColor : 'gray',
                width : Dimensions.get('screen').width - 72,
                height: (Dimensions.get('screen').width - 72) / 16 * 9,
                borderRadius : 4
              }}
            />

            <Text

            style = {{
              color : 'black',
              fontSize : 19,
              fontWeight : '600',
              marginTop : 16
            }}
            >
              Spesial Kajian Taaruf
            </Text>

            <Text
              style = {{
                color : 'gray',
                fontSize : 14,
                marginTop : 4
              }}
            >
              oleh Habib Muhammad al-Mutahhar
            </Text>

          </View>

          {
            homeItems.map((item, index) => {
              return (
              <HomeItem
                mencet = {
                  () => this.onItemClick(index)
                }
                title = {
                  item.title
                }
              />
              )
            })
          }
        </ScrollView>
      </SafeAreaView>
    )
  }

  onItemClick(index) {
    switch (index) {
      default:
        this.props.navigation.navigate("Detail")
        break
    }
  }

}

export default HomeScreen
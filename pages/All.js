import { NativeBaseProvider, FlatList, ScrollView, Divider, Image, Spinner } from "native-base";
import { services } from "../services/service";
import React, { useEffect, useState } from 'react'

import { View , Text, SafeAreaView , StyleSheet } from "react-native"
import {SSRProvider} from '@react-aria/ssr'; 


export default function All() {
    const [newsData, setNewsData] = useState([])
    useEffect(() => {
        services('general')
            .then(data => {
                setNewsData(data)
            })
            .catch(error => {
                alert(error)
            })
    }, [])
    return (
        <SSRProvider> 
        <NativeBaseProvider>
        <SafeAreaView style={{flex: 1}}>
        {newsData.length > 1 ? (
            <FlatList
                data={newsData}
                showsVerticalScrollIndicator
                renderItem={({ item }) => (
                    <View >
                        <View key={item} style={styles.newsContainer}>
                        <Image
                                    width={550}
                                    height={250}
                                    resizeMode={"cover"}
                                    source={{
                                        uri: item.urlToImage,
                                    }}
                                    alt="Alternate Text"
                                />
                            <Text>
                                {item.item}
                            </Text>
                            <Text>
                                {item.publishedAt}
                            </Text>
                            <Text>
                                {item.description}
                            </Text>
                        </View>
                        <Divider my={2} bg="#e0e0e0" />
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
            ) : (
                <View style={styles.spinner}>
                    <Spinner color="danger.400" />
                </View>
            )}
        </SafeAreaView>
    </NativeBaseProvider>
    </SSRProvider> 
    )
}

const styles = StyleSheet.create({
    newsContainer: {
        padding: 10
    },
    title: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: "600"
    },
    newsDescription: {
        fontSize: 16,
        marginTop: 10
    },
    date: {
        fontSize: 14
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 400
}
});


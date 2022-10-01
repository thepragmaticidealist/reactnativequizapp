import { Text, View, SafeAreaView, StatusBar, TouchableOpacity, Modal, Animated } from 'react-native'
import React, { Component, useState } from 'react';

import { COLORS, SIZES } from '../constants';
import data from '../data/quizdata';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Quiz = () =>  {
    const allQuestions = data;
    // set current question index to zero
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionDisabled, setIsOptionDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);


    const renderQuestion = () => {
        return (
        <View style={{paddingTop: 30}}>
            {/* Question counter */}
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                <Text style={{color: COLORS.white, fontSize: 20 }}>{currentQuestionIndex + 1}</Text>
                <Text style={{color: COLORS.white, fontSize: 20 }}>/</Text>
                <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.8}}>{allQuestions.length}</Text>
            </View>
            {/* Question */}
            <Text style={{ color: COLORS.white, fontSize: 30 }}>{allQuestions[currentQuestionIndex].question}</Text>
          </View>
        )
    }


    const validateAnswer = (selectedOption) => {
        let correctOption = allQuestions[currentQuestionIndex]['correct_option'];
        console.log('selected option', selectedOption);
        console.log('correct option', correctOption);
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correctOption);
        
        // Prevent user from selecting other options once the answer has been validated
        setIsOptionDisabled(true);

        if (selectedOption === correctOption) {
            // Increment score
            setScore(score +1);
        }
         // Show next button
        setShowNextButton(true);

         

    }

    const renderOptions = () => {
        return (
          <View style={{paddingTop: 20}}>
            {allQuestions[currentQuestionIndex].options.map(option => (
                <TouchableOpacity 
                onPress={() => validateAnswer(option)}
                disabled={isOptionDisabled}
                key={option} 
                style={{
                  borderWidth: 3, 
                  borderColor: option === correctOption ? COLORS.success : option === currentOptionSelected ? COLORS.error : COLORS.secondary + '40', 
                  backgroundColor: option === correctOption ? COLORS.lightsuccess : option === currentOptionSelected ? COLORS.lighterror : COLORS.secondary + '30',
                  height: 60, borderRadius: 20, 
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20, 
                  marginVertical: 20
                }}>
                <Text style={{ color: COLORS.white, fontSize: 25 }}>{option}</Text> 

                {/* Mark correct or wrong based on answer */}
                {
                option === correctOption ? (
                    <View style={{
                        width: 30, height: 30, borderRadius: 30/2,
                        backgroundColor: COLORS.success,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <MaterialCommunityIcons iconName="success-circle" style={{
                            color: COLORS.white,
                            fontSize: 20
                        }} />
                    </View>
                ): option === currentOptionSelected && option !== correctOption ? (
                    <View style={{
                        width: 30, height: 30, borderRadius: 30/2,
                        backgroundColor: COLORS.error,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <MaterialCommunityIcons iconName="cancel-circle-outline" style={{
                            color: COLORS.white,
                            fontSize: 20
                        }} />
                    </View>
                ) : null
                }
              </TouchableOpacity>
            )          
            )}
            
            {/* <Text style={{color: COLORS.white}}>correct option {correctOption}</Text>
            <Text style={{color: COLORS.white}}>selected option {currentOptionSelected}</Text> */}


          </View>
        )
    }

    const handleNext = () => {
        if (currentQuestionIndex === allQuestions.length-1) {
            // If we're at the last question, show the final score
            setShowNextButton(false);
            setShowScoreModal(true);
            

        } else {
            // move on to the next question and set the current option selected as null
            
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionDisabled(false);
            setShowNextButton(false);

            console.log('current question index', currentQuestionIndex)
            console.log('current option selected', currentOptionSelected);
        }

        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    const renderNextButton = () => {
        if(showNextButton){
            return (
                <TouchableOpacity
                onPress={handleNext}
                style={{
                    marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5
                }}>
                    <Text style={{fontSize: 20, color: COLORS.white, textAlign: 'center'}}>Next</Text>
                </TouchableOpacity>
            )
        }else{
            return null
        }
    }

    const restartQuiz = () => {
        // Go back to the first screen, reset state
        setShowScoreModal(false);
        setScore(0);
        setCurrentQuestionIndex(0);
        setShowNextButton(false);
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionDisabled(false);

        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();

    }

    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length - 1],
        outputRange: ['25%','100%']
    })

    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: COLORS.progress,

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.accent
                },{
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        )
    }

    const renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showScoreModal}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        width: '90%',
                        borderRadius: 20,
                        padding: 20,
                        alignItems: 'center'
                    }}>
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>{ score > (allQuestions.length/2) ? 'Congratulations!' : 'Better luck next time!' }</Text>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginVertical: 20
                    }}>
                        <Text style={{
                            fontSize: 30,
                            color: score> (allQuestions.length/2) ? COLORS.success : COLORS.error
                        }}>{score}</Text>
                        <Text style={{
                            fontSize: 20, color: COLORS.black
                        }}>/ { allQuestions.length }</Text>
                    </View>

                    {/* Retry Quiz button */}
                    <TouchableOpacity
                    onPress={restartQuiz}
                    style={{
                        backgroundColor: COLORS.accent,
                        padding: 20, width: '100%', borderRadius: 20
                    }}>
                        <Text style={{
                            textAlign: 'center', color: COLORS.white, fontSize: 20
                        }}>Retry Quiz</Text>
                    </TouchableOpacity>
                    </View>
                   </View>
               </Modal>
        )
    }

    return (
      <SafeAreaView style = {{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
          <View style={{
            flex: 1,
            paddingVertical: 40,
            paddingHorizontal: 16,
            backgroundColor: COLORS.background,
            position: 'relative'
            }}>
              {/* Progress Bar */}
              {renderProgressBar()}

              {/* Question */}
              {renderQuestion()}

              {/* Options */}
              {renderOptions()}

              {/* Next button */}
              {renderNextButton()}

              {/* Show score modal */}
              {renderModal()}

          </View>
      </SafeAreaView>
    )
}

export default Quiz
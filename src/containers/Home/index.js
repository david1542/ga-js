import { useRef, useState } from 'react';
import {Button} from 'reactstrap';
import styled from 'styled-components';

const PageContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 20px;
`;

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	padding-top: 10px;
`;

const Title = styled.h4``;

const PaddedContainer = styled.div`
	padding: 16px;
`;

const VerticalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 250px;
	height: 300px;
	border: 1px solid black;
`;

const ImageLabel = styled.span`
	font-weight: 400;
	margin-bottom: 8px;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
`;

const FloatingButton = styled(Button)`
	position: absolute;
	top: 105%;
`;

const Canvas = styled.canvas`
	width: 250px;
	height: 300px;
	border: 1px solid black;
`;

const Home = () => {
	// Initiate state
	const [image, setImage] = useState(null);
	const [isLoadingImage, setLoadingImage] = useState(false);

	// Create relevant dom refs
	const fileRef = useRef(null);
	const canvasRef = useRef(null);

	// Create a variable for convenience
	const isImageLoaded = !!image;

	// Define event handlers
	const onUploadClick = () => {
		fileRef.current.click();
	};

	const onClearImage = () => {
		setImage(null);
		fileRef.current.value = null
	};

	const onImageChange = e => {
		// Fetch the URL's image and save it inside the state
    if (e.target.files && e.target.files[0]) {
			const img = e.target.files[0];
			const reader = new FileReader();
			
			// Set loading image to true
			setLoadingImage(true);

			reader.onload = function(e) {
				// Store the image in the state
				setImage(e.target.result);

				// Set loading image to false
				setLoadingImage(false);
			}
			
			reader.readAsDataURL(img);
    }
  };

	const onStartEvolution = () => {
		const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //Our first draw
    context.fillStyle = 'rgb(0, 255, 255)';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    
    context.beginPath();
    context.arc(100, 75, 50, 0, 2 * Math.PI);
    context.stroke();
	};

	return (
		<PageContainer>
			<Title>Genetic Algorithm - Image Evolution</Title>
			<Container>
				<PaddedContainer>
					<VerticalContainer>
						<ImageLabel>Original Image</ImageLabel>
						<ImageContainer>
							{isImageLoaded && <Image src={image} />}
							{isLoadingImage && <span>Loading image...</span>}
							<input
								ref={fileRef}
								type="file"
								name="target-image"
								style={{display: 'none'}}
								accept=".png,.jpeg,.jpg"
								onChange={onImageChange}
							/>
						</ImageContainer>
						{isImageLoaded ? (
							<FloatingButton
								size="sm"
								color="primary"
								onClick={onClearImage}
							>
								Clear Image
							</FloatingButton>
						): (
							<FloatingButton
								size="sm"
								color="primary"
								onClick={onUploadClick}
							>
								Upload your image
							</FloatingButton>
						)}
					</VerticalContainer>
				</PaddedContainer>
				
				<PaddedContainer>
					<VerticalContainer>
						<ImageLabel>Approximated Image</ImageLabel>
						<Canvas ref={canvasRef} />
						{isImageLoaded && (
							<FloatingButton
								size="sm"
								color="success"
								onClick={onStartEvolution}
							>
								Start Evolution!
							</FloatingButton>
						)}
					</VerticalContainer>
				</PaddedContainer>
			</Container>
		</PageContainer>
	);
};

export {Home};

